"use client";
import type React from "react";
import { useState, useRef, useEffect } from "react";
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
  Clock,
  X,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Timer from "@/components/PuzzleTimer";
import { DailyPuzzle } from "@/Data/DailyQuestion";
import type { Question, InitialSourceCode } from "@/types/Questions";
import {
  useGetSubmissions,
  useSubmitCode,
  type LanguageId,
  type SubmissionResponse,
} from "@/hooks/api/sumbit-hooks";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "sonner";

interface Language {
  id: LanguageId;
  name: string;
  icon: string;
}
type Verdict = {
  success: boolean;
  message: string;
};
interface Submission {
  _id: Date;
  userId: string;
  verdict: Verdict;
  submittedAt: Date;
}

interface Submissions {
  questionId: string;
  submissions: Submission[];
}

type CodeMap = Record<string, string>;

// Submission Result Modal Component
interface SubmissionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubmitting: boolean;
  result: SubmissionResponse | null;
  error: string | null;
}

const SubmissionResultModal: React.FC<SubmissionResultModalProps> = ({
  isOpen,
  onClose,
  isSubmitting,
  result,
  error,
}) => {
  if (!isOpen) return null;

  const getStatusColor = (allPassed: boolean) => {
    return allPassed ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Submission Result</h3>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isSubmitting && (
            <div className="flex items-center space-x-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <div>
                <p className="font-medium text-lg">Running your code...</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Testing against all test cases. This may take a few moments.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-start space-x-3">
              <XCircle className="w-6 h-6 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-lg text-red-600 dark:text-red-400">
                  Submission Error
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {error}
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                {result.summary.allPassed ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
                <div>
                  <p
                    className={`font-medium text-xl ${getStatusColor(
                      result.summary.allPassed
                    )}`}
                  >
                    {result.summary.allPassed
                      ? "All Tests Passed!"
                      : "Some Tests Failed"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {result.summary.passed}/{result.summary.total} test cases
                    passed
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-lg">Test Results:</h4>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {result.results.map((testResult, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        testResult.pass
                          ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                          : "bg-red-50 dark:bg-red-900/20 border-red-500"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">
                          Test Case {testResult.testCaseIndex}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            testResult.pass
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {testResult.pass ? "PASS" : "FAIL"}
                        </span>
                      </div>
                      {!testResult.pass && (
                        <div className="text-sm space-y-2">
                          <div>
                            <span className="font-medium">Expected:</span>
                            <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-600 rounded text-xs overflow-x-auto">
                              {testResult.expected || "N/A"}
                            </pre>
                          </div>
                          <div>
                            <span className="font-medium">Got:</span>
                            <pre className="mt-1 p-2 bg-gray-100 dark:bg-gray-600 rounded text-xs overflow-x-auto">
                              {testResult.got || "N/A"}
                            </pre>
                          </div>
                          {testResult.error && (
                            <div>
                              <span className="font-medium">Error:</span>
                              <pre className="mt-1 p-2 bg-red-100 dark:bg-red-900/30 rounded text-xs overflow-x-auto text-red-600 dark:text-red-400">
                                {testResult.error}
                              </pre>
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

        {/* Modal Footer */}
        {!isSubmitting && (
          <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DailyPuzzlePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"description" | "submissions">(
    "description"
  );
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>("C++");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [code, setCode] = useState<CodeMap>({});
  const [submissions, setSubmissions] = useState<Submissions>({
    questionId: "",
    submissions: [],
  });
  const [showResultModal, setShowResultModal] = useState(false);

  const { UserData } = useSelector((state: RootState) => state.user);
  const { submitCode, isSubmitting, result, error, reset } = useSubmitCode();
  const { fetchSubmissions, loading } = useGetSubmissions();

  const languages: Language[] = [
    { id: "C++", name: "C++", icon: "🔥" },
    { id: "Java", name: "Java", icon: "☕" },
    { id: "Python", name: "Python3", icon: "🐍" },
    { id: "JavaScript", name: "JavaScript", icon: "🟨" },
    { id: "Rust", name: "Rust", icon: "🦀" },
    { id: "TypeScript", name: "TypeScript", icon: "🔷" },
  ];

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getDayOfMonth = (): number => {
    const now = new Date();
    return now.getDate();
  };

  // Fetch submissions when question changes
  useEffect(() => {
    const handleFetch = async () => {
      if (!currentQuestion || !UserData?._id) return;

      const resp = await fetchSubmissions({
        userId: UserData._id,
        questionId: currentQuestion.id.toString(),
      });
      if (resp.error) {
        toast.error("Failed to fetch submissions");
        return;
      }

      if (resp.data?.data) {
        setSubmissions({
          questionId: currentQuestion.id.toString(),
          submissions: resp.data.data.submissions || [],
        });
      }
    };
    handleFetch();
  }, [currentQuestion, UserData?._id, fetchSubmissions]);

  // Handle submission completion
  useEffect(() => {
    if (result || error) {
      // Refresh submissions after a successful submission
      if (result && currentQuestion && UserData?._id) {
        fetchSubmissions({
          userId: UserData._id,
          questionId: currentQuestion.id.toString(),
        }).then((resp) => {
          if (resp.data?.data) {
            setSubmissions({
              questionId: currentQuestion.id.toString(),
              submissions: resp.data.data.submissions || [],
            });
          }
        });
      }
    }
  }, [result, error, currentQuestion, UserData?._id, fetchSubmissions]);

  useEffect(() => {
    const dayOfMonth = getDayOfMonth();
    const questionIndex = dayOfMonth % DailyPuzzle.questions.length;
    const question = DailyPuzzle.questions[questionIndex];

    setCurrentQuestion(question);

    if (question) {
      const initialCodeMap: CodeMap = {};
      question.initial_sourcecode.forEach((sourceCode: InitialSourceCode) => {
        initialCodeMap[sourceCode.lang_id] = sourceCode.code;
      });
      setCode(initialCodeMap);

      if (question.initial_sourcecode.length > 0) {
        setSelectedLanguage(
          question.initial_sourcecode[0].lang_id as LanguageId
        );
      }
    }
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode((prev) => ({
      ...prev,
      [selectedLanguage]: e.target.value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      const newValue =
        value.substring(0, start) + "    " + value.substring(end);
      setCode((prev) => ({
        ...prev,
        [selectedLanguage]: newValue,
      }));

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code[selectedLanguage] || "");
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleSubmit = async () => {
    if (!currentQuestion || !code[selectedLanguage]?.trim()) {
      return;
    }
    reset();
    setShowResultModal(true);

    await submitCode({
      userId: UserData?._id || null,
      questionId: currentQuestion.id.toString(),
      language: selectedLanguage,
      source_code: code[selectedLanguage],
    });
  };

  const handleCloseResultModal = () => {
    setShowResultModal(false);
    reset();
  };

  const resetCode = () => {
    if (!currentQuestion) return;

    const originalCode = currentQuestion.initial_sourcecode.find(
      (src: InitialSourceCode) => src.lang_id === selectedLanguage
    );

    if (originalCode) {
      setCode((prev) => ({
        ...prev,
        [selectedLanguage]: originalCode.code,
      }));
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value as LanguageId;
    setSelectedLanguage(newLanguage);

    if (!code[newLanguage] && currentQuestion) {
      const sourceCode = currentQuestion.initial_sourcecode.find(
        (src: InitialSourceCode) => src.lang_id === newLanguage
      );
      if (sourceCode) {
        setCode((prev) => ({
          ...prev,
          [newLanguage]: sourceCode.code,
        }));
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
      case "Hard":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200";
    }
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  if (!currentQuestion) {
    return (
      <div className="h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading daily puzzle...
          </p>
        </div>
      </div>
    );
  }

  const availableLanguages = languages.filter((lang) =>
    currentQuestion.initial_sourcecode.some(
      (src: InitialSourceCode) => src.lang_id === lang.id
    )
  );

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
                {copySuccess ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
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
              <div
                key={index}
                className="px-3 py-1 text-right leading-6 min-h-[24px]"
              >
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
    );
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
                    <h2 className="text-2xl font-bold mb-2">
                      {currentQuestion.question_title}
                    </h2>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                          currentQuestion.difficulty
                        )}`}
                      >
                        {currentQuestion.difficulty}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {currentQuestion.id}
                        </span>
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
                  {currentQuestion.hints &&
                    currentQuestion.hints.length > 0 && (
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
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                      Hints:
                    </h4>
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
                      Submissions ({submissions?.submissions?.length || 0})
                    </button>
                  </nav>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                  {activeTab === "description" && (
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-wrap">
                        {currentQuestion.description}
                      </div>

                      {currentQuestion.example &&
                        currentQuestion.example.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="font-semibold text-lg">Examples:</h4>
                            {currentQuestion.example.map((example, index) => (
                              <div
                                key={index}
                                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
                              >
                                <h5 className="font-semibold mb-2">
                                  Example {index + 1}:
                                </h5>
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
                                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        {example.explanation}
                                      </p>
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
                      <h3 className="text-lg font-semibold">
                        Your Submission History
                      </h3>

                      {loading && (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                          <span className="ml-2 text-gray-600 dark:text-gray-400">
                            Loading submissions...
                          </span>
                        </div>
                      )}

                      {!loading && submissions?.submissions?.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>
                            No submissions yet. Submit your solution to see your
                            submission history here.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {submissions?.submissions
                            ?.sort(
                              (a, b) =>
                                new Date(b.submittedAt).getTime() -
                                new Date(a.submittedAt).getTime()
                            )
                            .map((submission, index) => (
                              <div
                                key={`${submission._id || submission.submittedAt}-${index}`}
                                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-start space-x-3"
                              >
                                <div className="flex-shrink-0">
                                  {getStatusIcon(submission.verdict.success)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span
                                      className={`font-medium ${
                                        submission.verdict.success
                                          ? "text-green-600 dark:text-green-400"
                                          : "text-red-600 dark:text-red-400"
                                      }`}
                                    >
                                      {submission.verdict.success
                                        ? "Accepted"
                                        : "Failed"}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                      <Clock className="inline w-3 h-3 mr-1" />
                                      {new Date(
                                        submission.submittedAt
                                      ).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {submission.verdict.message}
                                  </p>
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
                      {copySuccess ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
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
                    {(code[selectedLanguage] || "")
                      .split("\n")
                      .map((_, index) => (
                        <div
                          key={index}
                          className="px-2 py-0.5 text-right leading-6 min-h-[24px]"
                        >
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
                  <span>
                    Ln {(code[selectedLanguage] || "").split("\n").length}
                  </span>
                  <span>Ready</span>
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

      {/* Submission Result Modal */}
      <SubmissionResultModal
        isOpen={showResultModal}
        onClose={handleCloseResultModal}
        isSubmitting={isSubmitting}
        result={result}
        error={error}
      />
    </div>
  );
};

export default DailyPuzzlePage;
