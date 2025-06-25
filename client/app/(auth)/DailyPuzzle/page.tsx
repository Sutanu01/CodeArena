"use client"
import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  RotateCcw,
  Maximize2,
  Copy,
  Calendar,
  Target,
  BookOpen,
  Send,
  Minimize2,
  Check,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Timer from "@/components/PuzzleTimer"
import { DailyPuzzle } from "@/Data/DailyQuestion"
import type { Question, InitialSourceCode } from "@/types/Questions"
import { useSubmitCode, type LanguageId, type TestResult } from "@/hooks/api/sumbit-hooks"

interface Language {
  id: LanguageId
  name: string
  icon: string
}

interface StoredSubmission {
  id: string
  questionId: number
  language: LanguageId
  timestamp: string
  summary: {
    total: number
    passed: number
    failed: number
    allPassed: boolean
  }
  results: TestResult[]
}

type CodeMap = Record<string, string>

const DailyPuzzlePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"description" | "submissions">("description")
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>("C++")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showHints, setShowHints] = useState(false)
  const [code, setCode] = useState<CodeMap>({})
  const [storedSubmissions, setStoredSubmissions] = useState<StoredSubmission[]>([])

  const { submitCode, isSubmitting, result, error, reset } = useSubmitCode()

  const languages: Language[] = [
    { id: "C++", name: "C++", icon: "🔥" },
    { id: "Java", name: "Java", icon: "☕" },
    { id: "Python", name: "Python3", icon: "🐍" },
    { id: "JavaScript", name: "JavaScript", icon: "🟨" },
    { id: "Rust", name: "Rust", icon: "🦀" },
    { id: "TypeScript", name: "TypeScript", icon: "🔷" },
  ]

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const getDayOfMonth = (): number => {
    const now = new Date()
    return now.getDate()
  }

  //um bro ea bhi implement kardena localmai rakh rha hu, aur ha testcases db mai nhi hai ,
  //  ek kaam kanra sumbission ka ek shcema banake sara sumbission udhar store karndea, with cron job to clear every 2months ig
  useEffect(() => {
    const stored = localStorage.getItem("daily-puzzle-submissions")
    if (stored) {
      try {
        setStoredSubmissions(JSON.parse(stored))
      } catch (error) {
        console.error("Error loading stored submissions:", error)
      }
    }
  }, [])

  const saveSubmission = (submission: StoredSubmission) => {
    const updated = [submission, ...storedSubmissions]
    setStoredSubmissions(updated)
    localStorage.setItem("daily-puzzle-submissions", JSON.stringify(updated))
  }

  useEffect(() => {
    if (result && currentQuestion) {
      const submission: StoredSubmission = {
        id: Date.now().toString(),
        questionId: currentQuestion.id,
        language: selectedLanguage,
        timestamp: new Date().toLocaleString(),
        summary: result.summary,
        results: result.results,
      }
      saveSubmission(submission)
      setActiveTab("submissions")
    }
  }, [result, currentQuestion, selectedLanguage])

  useEffect(() => {
    const dayOfMonth = getDayOfMonth()
    const questionIndex = dayOfMonth % DailyPuzzle.questions.length
    const question = DailyPuzzle.questions[questionIndex]

    setCurrentQuestion(question)
    setCurrentQuestionIndex(questionIndex)

    if (question) {
      const initialCodeMap: CodeMap = {}
      question.initial_sourcecode.forEach((sourceCode: InitialSourceCode) => {
        initialCodeMap[sourceCode.lang_id] = sourceCode.code
      })
      setCode(initialCodeMap)

      if (question.initial_sourcecode.length > 0) {
        setSelectedLanguage(question.initial_sourcecode[0].lang_id as LanguageId)
      }
    }
  }, [])

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode((prev) => ({
      ...prev,
      [selectedLanguage]: e.target.value,
    }))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const textarea = e.target as HTMLTextAreaElement
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const value = textarea.value
      const newValue = value.substring(0, start) + "    " + value.substring(end)
      setCode((prev) => ({
        ...prev,
        [selectedLanguage]: newValue,
      }))

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4
      }, 0)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code[selectedLanguage] || "")
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  const handleSubmit = async () => {
    if (!currentQuestion || !code[selectedLanguage]?.trim()) {
      return
    }
    reset() 
    await submitCode({
      questionId: currentQuestion.id.toString(),
      language: selectedLanguage,
      source_code: code[selectedLanguage],
    })
  }

  const resetCode = () => {
    if (!currentQuestion) return

    const originalCode = currentQuestion.initial_sourcecode.find(
      (src: InitialSourceCode) => src.lang_id === selectedLanguage,
    )

    if (originalCode) {
      setCode((prev) => ({
        ...prev,
        [selectedLanguage]: originalCode.code,
      }))
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as LanguageId
    setSelectedLanguage(newLanguage)

    if (!code[newLanguage] && currentQuestion) {
      const sourceCode = currentQuestion.initial_sourcecode.find(
        (src: InitialSourceCode) => src.lang_id === newLanguage,
      )
      if (sourceCode) {
        setCode((prev) => ({
          ...prev,
          [newLanguage]: sourceCode.code,
        }))
      }
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
      case "Hard":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    if (status === "Accepted") return <CheckCircle className="w-4 h-4 text-green-500" />
    if (status.includes("Error")) return <XCircle className="w-4 h-4 text-red-500" />
    return <AlertCircle className="w-4 h-4 text-yellow-500" />
  }

  const getStatusColor = (allPassed: boolean) => {
    return allPassed ? "text-green-500" : "text-red-500"
  }

  if (!currentQuestion) {
    return (
      <div className="h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading daily puzzle...</p>
        </div>
      </div>
    )
  }

  const availableLanguages = languages.filter((lang) =>
    currentQuestion.initial_sourcecode.some((src: InitialSourceCode) => src.lang_id === lang.id),
  )

  const currentQuestionSubmissions = storedSubmissions.filter((sub) => sub.questionId === currentQuestion.id)

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.id} value={lang.id}>
                    {lang.icon} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={resetCode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Reset Code"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                title="Copy Code"
              >
                {copySuccess ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Exit Fullscreen"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600 flex flex-col text-sm text-gray-500 dark:text-gray-400 font-mono overflow-y-auto">
            {(code[selectedLanguage] || "").split("\n").map((_, index) => (
              <div key={index} className="px-3 py-1 text-right leading-6 min-h-[24px]">
                {index + 1}
              </div>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            value={code[selectedLanguage] || ""}
            onChange={handleCodeChange}
            onKeyDown={handleKeyDown}
            className="w-full h-full pl-20 pr-4 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-base resize-none focus:outline-none leading-6"
            style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
            spellCheck={false}
            autoFocus
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <h1 className="text-lg font-semibold">Daily Question</h1>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <Timer />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            {/* Left Panel */}
            <div className="flex flex-col space-y-6 overflow-hidden">
              {/* Problem Header */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex-shrink-0">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{currentQuestion.question_title}</h2>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                          currentQuestion.difficulty,
                        )}`}
                      >
                        {currentQuestion.difficulty}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{currentQuestion.id}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentQuestion.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                  {currentQuestion.hints && currentQuestion.hints.length > 0 && (
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                    >
                      <Lightbulb className="w-3 h-3" />
                      <span>Hint ({currentQuestion.hints.length})</span>
                    </button>
                  )}
                </div>

                {showHints && currentQuestion.hints && (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Hints:</h4>
                    <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                      {currentQuestion.hints.map((hint, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          <span>{hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tabs */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex-1 flex flex-col overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "description"
                          ? "border-blue-500 text-blue-600 dark:text-blue-400"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTab("submissions")}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "submissions"
                          ? "border-blue-500 text-blue-600 dark:text-blue-400"
                          : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      }`}
                    >
                      Submissions ({currentQuestionSubmissions.length})
                    </button>
                  </nav>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                  {activeTab === "description" && (
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-wrap">
                        {currentQuestion.description}
                      </div>

                      {currentQuestion.example && currentQuestion.example.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg">Examples:</h4>
                          {currentQuestion.example.map((example, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                              <h5 className="font-semibold mb-2">Example {index + 1}:</h5>
                              <div className="font-mono text-sm space-y-2">
                                <div>
                                  <strong>Input:</strong>
                                  <pre className="bg-gray-100 dark:bg-gray-600 p-2 rounded mt-1 overflow-x-auto">
                                    {example.input}
                                  </pre>
                                </div>
                                <div>
                                  <strong>Output:</strong>
                                  <pre className="bg-gray-100 dark:bg-gray-600 p-2 rounded mt-1 overflow-x-auto">
                                    {example.output}
                                  </pre>
                                </div>
                                {example.explanation && (
                                  <div>
                                    <strong>Explanation:</strong>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">{example.explanation}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "submissions" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Your Submissions</h3>

                      {/* Current Submission Status */}
                      {(isSubmitting || result || error) && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                          {isSubmitting && (
                            <div className="flex items-center space-x-3">
                              <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                              <div>
                                <p className="font-medium">Running your code...</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Testing against all test cases
                                </p>
                              </div>
                            </div>
                          )}

                          {error && (
                            <div className="flex items-start space-x-3">
                              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                              <div>
                                <p className="font-medium text-red-600 dark:text-red-400">Submission Error</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
                              </div>
                            </div>
                          )}

                          {result && (
                            <div className="space-y-4">
                              <div className="flex items-center space-x-3">
                                {result.summary.allPassed ? (
                                  <CheckCircle className="w-6 h-6 text-green-500" />
                                ) : (
                                  <XCircle className="w-6 h-6 text-red-500" />
                                )}
                                <div>
                                  <p className={`font-medium ${getStatusColor(result.summary.allPassed)}`}>
                                    {result.summary.allPassed ? "All Tests Passed!" : "Some Tests Failed"}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {result.summary.passed}/{result.summary.total} test cases passed
                                  </p>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-medium">Test Results:</h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                  {result.results.map((testResult, index) => (
                                    <div
                                      key={index}
                                      className={`p-3 rounded border-l-4 ${
                                        testResult.pass
                                          ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                                          : "bg-red-50 dark:bg-red-900/20 border-red-500"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">Test Case {testResult.testCaseIndex}</span>
                                        <span
                                          className={`text-sm ${testResult.pass ? "text-green-600" : "text-red-600"}`}
                                        >
                                          {testResult.pass ? "PASS" : "FAIL"}
                                        </span>
                                      </div>
                                      {!testResult.pass && (
                                        <div className="text-sm space-y-1">
                                          <div>
                                            <span className="font-medium">Expected:</span>
                                            <code className="ml-2 bg-gray-100 dark:bg-gray-600 px-1 rounded">
                                              {testResult.expected || "N/A"}
                                            </code>
                                          </div>
                                          <div>
                                            <span className="font-medium">Got:</span>
                                            <code className="ml-2 bg-gray-100 dark:bg-gray-600 px-1 rounded">
                                              {testResult.got || "N/A"}
                                            </code>
                                          </div>
                                          {testResult.error && (
                                            <div>
                                              <span className="font-medium">Error:</span>
                                              <code className="ml-2 bg-gray-100 dark:bg-gray-600 px-1 rounded text-red-600">
                                                {testResult.error}
                                              </code>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {currentQuestionSubmissions.length === 0 && !isSubmitting && !result && !error ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No submissions yet. Submit your solution to see results here.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {currentQuestionSubmissions.map((submission) => (
                            <div
                              key={submission.id}
                              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                            >
                              <div className="flex items-center space-x-4">
                                {getStatusIcon(submission.summary.allPassed ? "Accepted" : "Wrong Answer")}
                                <span className={`font-medium ${getStatusColor(submission.summary.allPassed)}`}>
                                  {submission.summary.allPassed ? "Accepted" : "Wrong Answer"}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">{submission.language}</span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{submission.timestamp}</span>
                                </span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                <span>
                                  {submission.summary.passed}/{submission.summary.total} passed
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Panel - Code Editor */}
            <div className="flex flex-col space-y-4 overflow-hidden">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex-1 flex flex-col overflow-hidden">
                {/* Editor Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <div className="flex items-center space-x-4">
                    <select
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                      className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {availableLanguages.map((lang) => (
                        <option key={lang.id} value={lang.id}>
                          {lang.icon} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={resetCode}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Reset Code"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                      title="Copy Code"
                    >
                      {copySuccess ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      title="Fullscreen"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Code Editor */}
                <div className="relative flex-1 overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600 flex flex-col text-xs text-gray-500 dark:text-gray-400 font-mono overflow-y-auto">
                    {(code[selectedLanguage] || "").split("\n").map((_, index) => (
                      <div key={index} className="px-2 py-0.5 text-right leading-6 min-h-[24px]">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={code[selectedLanguage] || ""}
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDown}
                    className="w-full h-full pl-14 pr-4 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none focus:outline-none leading-6"
                    style={{
                      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                    }}
                    spellCheck={false}
                  />
                </div>

                {/* Status Bar */}
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 text-xs text-gray-600 dark:text-gray-400 flex justify-between items-center flex-shrink-0">
                  <span>Ln {(code[selectedLanguage] || "").split("\n").length}</span>
                  <span>{isSubmitting ? "Submitting..." : "Ready"}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !code[selectedLanguage]?.trim()}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors flex-shrink-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DailyPuzzlePage
