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
  type TestResult,
} from "@/hooks/api/submit-hooks";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { useGetUserInfo } from "@/hooks/api/user-hooks";
import { setUserData } from "@/redux/reducers/user";

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

// Regex syntax highlighter helper
const highlightCode = (code: string, language: LanguageId): React.ReactNode[] => {
  if (!code) return [];

  // Match comments, strings, numbers, keywords, function names, type names, and punctuation
  const combinedRegex = language === "Python"
    ? /(#.*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(\b(?:const|let|var|function|return|if|else|elif|for|while|do|switch|case|default|break|continue|try|except|catch|finally|throw|new|delete|class|extends|import|from|export|true|false|null|undefined|this|super|async|await|def|lambda|pass|fn|mut|match|impl|trait|pub|struct|use|mod|unsafe|extern|int|float|double|char|bool|boolean|void|long|short|string|String|self|Self|None|True|False|and|or|not|in|is|as|package|implements|throws|public|private|protected|static|final)\b)|(\b[a-zA-Z_]\w*(?=\())|(\b(?:Vector|List|Map|Set|Dict|Tuple|Array|any|number|string|boolean|unknown|void|never|undefined|object|Record|Promise|Task)\b)|([{}()[\].,:;+\-*/%&|^!=<>?~])/g
    : /(\/\/.*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(\b(?:const|let|var|function|return|if|else|elif|for|while|do|switch|case|default|break|continue|try|except|catch|finally|throw|new|delete|class|extends|import|from|export|true|false|null|undefined|this|super|async|await|def|lambda|pass|fn|mut|match|impl|trait|pub|struct|use|mod|unsafe|extern|int|float|double|char|bool|boolean|void|long|short|string|String|self|Self|None|True|False|and|or|not|in|is|as|package|implements|throws|public|private|protected|static|final)\b|#include|#define|#ifdef|#ifndef|#endif|#pragma|#import)|(\b[a-zA-Z_]\w*(?=\())|(\b(?:Vector|List|Map|Set|Dict|Tuple|Array|any|number|string|boolean|unknown|void|never|undefined|object|Record|Promise|Task)\b)|([{}()[\].,:;+\-*/%&|^!=<>?~])/g;

  let match;
  let lastIndex = 0;
  const parts: React.ReactNode[] = [];
  combinedRegex.lastIndex = 0;

  let keyIndex = 0;

  while ((match = combinedRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      parts.push(code.substring(lastIndex, match.index));
    }

    if (match[1]) {
      parts.push(
        <span key={keyIndex++} className="text-gray-500 dark:text-emerald-500/80 italic whitespace-pre">
          {match[1]}
        </span>
      );
    } else if (match[2]) {
      parts.push(
        <span key={keyIndex++} className="text-green-600 dark:text-amber-400 whitespace-pre">
          {match[2]}
        </span>
      );
    } else if (match[3]) {
      parts.push(
        <span key={keyIndex++} className="text-cyan-600 dark:text-cyan-400 whitespace-pre">
          {match[3]}
        </span>
      );
    } else if (match[4]) {
      parts.push(
        <span key={keyIndex++} className="text-purple-600 dark:text-pink-400 font-semibold whitespace-pre">
          {match[4]}
        </span>
      );
    } else if (match[5]) {
      parts.push(
        <span key={keyIndex++} className="text-blue-600 dark:text-blue-400 font-medium whitespace-pre">
          {match[5]}
        </span>
      );
    } else if (match[6]) {
      parts.push(
        <span key={keyIndex++} className="text-yellow-600 dark:text-yellow-500 font-medium whitespace-pre">
          {match[6]}
        </span>
      );
    } else if (match[7]) {
      parts.push(
        <span key={keyIndex++} className="text-pink-500 dark:text-gray-400 whitespace-pre">
          {match[7]}
        </span>
      );
    }

    lastIndex = combinedRegex.lastIndex;
  }

  if (lastIndex < code.length) {
    parts.push(code.substring(lastIndex));
  }

  return parts;
};

// Reusable custom scroll-synced highlighted code editor component
interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  language: LanguageId;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (textareaRef.current) {
      const { scrollTop, scrollLeft } = textareaRef.current;
      if (preRef.current) {
        preRef.current.scrollTop = scrollTop;
        preRef.current.scrollLeft = scrollLeft;
      }
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = scrollTop;
      }
    }
  };

  useEffect(() => {
    handleScroll();
  }, [value]);

  const lines = value.split("\n");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const val = textarea.value;
      const newValue = val.substring(0, start) + "    " + val.substring(end);
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const editorStyle = {
    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
    fontSize: "14px",
    lineHeight: "24px",
    padding: "16px",
  };

  return (
    <div className="relative flex-1 flex overflow-hidden font-mono text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg h-full w-full">
      {/* Line Numbers */}
      <div
        ref={lineNumbersRef}
        className="w-12 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600 flex flex-col text-xs text-gray-500 dark:text-gray-400 text-right pr-3 select-none overflow-hidden font-mono"
        style={{
          paddingTop: "16px",
          paddingBottom: "16px",
        }}
      >
        {lines.map((_, index) => (
          <div key={index} style={{ height: "24px", lineHeight: "24px" }}>
            {index + 1}
          </div>
        ))}
      </div>

      {/* Editor Content Area */}
      <div className="relative flex-1 overflow-hidden">
        {/* Pre elements for syntax highlighted display */}
        <pre
          ref={preRef}
          className="absolute inset-0 bg-transparent text-gray-900 dark:text-gray-100 whitespace-pre overflow-hidden pointer-events-none select-none border-0"
          style={{
            ...editorStyle,
            margin: 0,
          }}
        >
          <code>{highlightCode(value, language)}</code>
        </pre>

        {/* Real transparent Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          className="absolute inset-0 bg-transparent text-transparent caret-gray-900 dark:caret-white resize-none focus:outline-none whitespace-pre overflow-auto select-text w-full h-full border-0 focus:ring-0"
          style={{
            ...editorStyle,
            margin: 0,
            WebkitTextFillColor: "transparent",
          }}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

// Submission Result Modal Component
interface SubmissionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubmitting: boolean;
  result: SubmissionResponse | null;
  error: string | null;
}

// Collapsible test result card subcomponent
const TestCaseCard: React.FC<{ testResult: TestResult }> = ({ testResult }) => {
  const [expanded, setExpanded] = useState(!testResult.pass);

  return (
    <div
      className={`border rounded-lg transition-all overflow-hidden ${
        testResult.pass
          ? "border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50"
          : "border-red-200 dark:border-red-900/40 bg-red-50/10 dark:bg-red-950/10"
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
      >
        <div className="flex items-center space-x-3">
          {testResult.pass ? (
            <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-950/60 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center animate-pulse">
              <X className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            </div>
          )}
          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
            Test Case {testResult.testCaseIndex}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              testResult.pass
                ? "bg-green-100/60 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                : "bg-red-100/60 text-red-700 dark:bg-red-950/40 dark:text-red-400"
            }`}
          >
            {testResult.pass ? "PASSED" : "FAILED"}
          </span>
          <ChevronRight className={`w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform ${expanded ? "rotate-90" : ""}`} />
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-3 space-y-3 bg-white/40 dark:bg-gray-800/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-medium text-gray-500 dark:text-gray-400 block mb-1">Expected Output:</span>
              <pre className="p-3 bg-gray-50 dark:bg-gray-900 rounded overflow-x-auto font-mono text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                {testResult.expected || "N/A"}
              </pre>
            </div>
            <div>
              <span className="font-medium text-gray-500 dark:text-gray-400 block mb-1">Actual Output:</span>
              <pre className={`p-3 rounded overflow-x-auto font-mono border ${
                testResult.pass
                  ? "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                  : "bg-red-50/20 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200/40 dark:border-red-900/20"
              }`}>
                {testResult.got || "N/A"}
              </pre>
            </div>
          </div>
          {testResult.error && (
            <div className="text-xs">
              <span className="font-medium text-red-600 dark:text-red-400 block mb-1">Compiler/Runtime Output:</span>
              <pre className="p-3 bg-red-50/40 dark:bg-red-900/20 rounded overflow-x-auto text-red-700 dark:text-red-300 font-mono border border-red-100/30 dark:border-red-900/10">
                {testResult.error}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SubmissionResultModal: React.FC<SubmissionResultModalProps> = ({
  isOpen,
  onClose,
  isSubmitting,
  result,
  error,
}) => {
  const getStatusColor = (allPassed: boolean) => {
    return allPassed ? "text-green-500" : "text-red-500";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-hidden z-10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Submission Result
                </h3>
              </div>
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {isSubmitting && (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                    <Loader2 className="w-6 h-6 animate-pulse text-blue-500 absolute" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                      Running test suites...
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto">
                      Executing your code against the validation cases via Judge0 API.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-start space-x-4 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg">
                  <XCircle className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-red-600 dark:text-red-400">
                      Submission Error
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-300 mt-1 whitespace-pre-wrap font-mono text-xs">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  {/* Verdict Block */}
                  <div className={`relative overflow-hidden p-6 rounded-lg border ${
                    result.summary.allPassed
                      ? "bg-green-50/20 dark:bg-green-950/10 border-green-200 dark:border-green-900/40"
                      : "bg-red-50/20 dark:bg-red-950/10 border-red-200 dark:border-red-900/40"
                  }`}>
                    <div className="flex items-start space-x-4 relative">
                      <div className="mt-1">
                        {result.summary.allPassed ? (
                          <CheckCircle className="w-10 h-10 text-green-500 dark:text-green-400 animate-bounce" />
                        ) : (
                          <XCircle className="w-10 h-10 text-red-500 dark:text-red-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-xl font-bold tracking-tight ${getStatusColor(result.summary.allPassed)}`}>
                          {result.summary.allPassed ? "All Tests Passed!" : "Compilation / Test Failed"}
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                            Passed: {result.summary.passed}
                          </span>
                          <span className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                            Failed: {result.summary.failed}
                          </span>
                          <span className="flex items-center">
                            Total Cases: {result.summary.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Individual Test Cases Details */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                      Detailed Test Cases
                      <span className="ml-2 text-xs font-normal text-gray-400 dark:text-gray-500">
                        (Expand to see output differences)
                      </span>
                    </h4>
                    
                    <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
                      {result.results.map((testResult, index) => (
                        <TestCaseCard key={index} testResult={testResult} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


const DailyPuzzlePage: React.FC = () => {
  const router = useRouter();
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
  const [isDesktop, setIsDesktop] = useState(false);

  const { UserData } = useSelector((state: RootState) => state.user);
  const { submitCode, isSubmitting, result, error, reset } = useSubmitCode();
  const { fetchSubmissions, loading } = useGetSubmissions();

  const dispatch = useDispatch();
  const { isLoaded: isUserLoaded, isSignedIn, user } = useUser();
  const { fetchUser } = useGetUserInfo();

  useEffect(() => {
    if (!isUserLoaded || !isSignedIn || !user?.id || UserData) return;

    const loadUserData = async () => {
      const resp = await fetchUser(user.id);
      if (resp.success && resp.data) {
        dispatch(setUserData(resp.data));
      }
    };
    loadUserData();
  }, [isUserLoaded, isSignedIn, user, UserData, fetchUser, dispatch]);

  const languages: Language[] = [
    { id: "C++", name: "C++", icon: "🔥" },
    { id: "Java", name: "Java", icon: "☕" },
    { id: "Python", name: "Python3", icon: "🐍" },
    { id: "JavaScript", name: "JavaScript", icon: "🟨" },
    { id: "Rust", name: "Rust", icon: "🦀" },
    { id: "TypeScript", name: "TypeScript", icon: "🔷" },
  ];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

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
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200/50 dark:border-green-800/30";
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border border-yellow-200/50 dark:border-yellow-800/30";
      case "Hard":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border border-red-200/50 dark:border-red-800/30";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800";
    }
  };

  const getStatusIcon = (success: boolean) => {
    return success ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  if (!currentQuestion || !UserData) {
    return (
      <div className="h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 p-8 bg-white dark:bg-[#1A1D26] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl max-w-sm w-full mx-4 animate-pulse">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 dark:text-blue-400" />
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Loading daily puzzle...
          </span>
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center leading-relaxed">
            Fetching standard and user-specific submissions
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
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col animate-in fade-in duration-200">
        {/* Fullscreen Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2" />
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-gray-800 dark:text-gray-200"
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
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Reset Code"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg text-gray-450 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
                title="Copy Code"
              >
                {copySuccess ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1" />
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Exit Fullscreen"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Fullscreen Code Area */}
        <div className="flex-1 p-6 bg-white dark:bg-gray-900 overflow-hidden flex flex-col">
          <CodeEditor
            value={code[selectedLanguage] || ""}
            onChange={(val) =>
              setCode((prev) => ({ ...prev, [selectedLanguage]: val }))
            }
            language={selectedLanguage}
          />
        </div>
      </div>
    );
  }

  const leftPanelContent = (
    <div className="flex flex-col space-y-6 lg:h-full lg:overflow-hidden bg-white dark:bg-gray-900">
      {/* Problem Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex-shrink-0 relative overflow-hidden">
        <div className="flex items-start justify-between mb-4 relative z-10">
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
                  Question #{currentQuestion.id}
                </span>
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <BookOpen className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 relative z-10">
          {currentQuestion.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200/40 dark:border-gray-600"
            >
              {tag}
            </span>
          ))}
          {currentQuestion.hints &&
            currentQuestion.hints.length > 0 && (
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center space-x-1.5 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-400 border border-yellow-200/40 dark:border-yellow-900/30 rounded-full text-sm font-medium hover:bg-yellow-200/50 dark:hover:bg-yellow-900/50 transition-colors animate-pulse"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Hint ({currentQuestion.hints.length})</span>
              </button>
            )}
        </div>

        {showHints && currentQuestion.hints && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200/40 dark:border-yellow-800 relative z-10">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Hints:
            </h4>
            <ul className="space-y-1.5 text-xs text-yellow-700 dark:text-gray-300">
              {currentQuestion.hints.map((hint, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-yellow-500 mt-1 flex-shrink-0">•</span>
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex-1 flex flex-col lg:overflow-hidden shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50/20 dark:bg-gray-900/20">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "description"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("submissions")}
              className={`py-4 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === "submissions"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Submissions ({submissions?.submissions?.length || 0})
            </button>
          </nav>
        </div>

        <div className="p-6 flex-1 lg:overflow-y-auto">
          {activeTab === "description" && (
            <div className="prose dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-wrap text-sm leading-relaxed">
                {currentQuestion.description}
              </div>

              {currentQuestion.example &&
                currentQuestion.example.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 dark:text-gray-100 text-base">Examples:</h4>
                    {currentQuestion.example.map((example, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-700/60"
                      >
                        <h5 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-2">
                          Example {index + 1}:
                        </h5>
                        <div className="font-mono text-xs space-y-3">
                          <div>
                            <strong className="text-gray-600 dark:text-gray-400 block mb-1">Input:</strong>
                            <pre className="bg-gray-100 dark:bg-gray-600 p-2.5 rounded overflow-x-auto border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300">
                              {example.input}
                            </pre>
                          </div>
                          <div>
                            <strong className="text-gray-600 dark:text-gray-400 block mb-1">Output:</strong>
                            <pre className="bg-gray-100 dark:bg-gray-600 p-2.5 rounded overflow-x-auto border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300">
                              {example.output}
                            </pre>
                          </div>
                          {example.explanation && (
                            <div>
                              <strong className="text-gray-600 dark:text-gray-400 block mb-1">Explanation:</strong>
                              <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs leading-relaxed font-sans">
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Your Submission History
              </h3>

              {loading && (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Loading submissions history...
                  </span>
                </div>
              )}

              {!loading && submissions?.submissions?.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/20">
                  <Send className="w-10 h-10 mx-auto mb-3 opacity-40 text-gray-400" />
                  <p className="text-sm font-medium">No submissions yet.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Submit your solution to get evaluated.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 font-sans">
                  {submissions?.submissions
                    ?.sort(
                      (a, b) =>
                        new Date(b.submittedAt).getTime() -
                        new Date(a.submittedAt).getTime()
                    )
                    .map((submission, index) => (
                      <div
                        key={`${submission._id || submission.submittedAt}-${index}`}
                        className={`p-4 rounded-lg border flex items-start space-x-3 transition-colors ${
                          submission.verdict.success
                            ? "bg-green-50/10 dark:bg-green-950/5 border-green-200/60 dark:border-green-900/20"
                            : "bg-red-50/10 dark:bg-red-950/5 border-red-200/60 dark:border-red-900/20"
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getStatusIcon(submission.verdict.success)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className={`font-semibold text-sm ${
                                submission.verdict.success
                                  ? "text-green-700 dark:text-green-400"
                                  : "text-red-700 dark:text-red-400"
                              }`}
                            >
                              {submission.verdict.success
                                ? "Accepted"
                                : "Failed"}
                            </span>
                            <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center font-medium">
                              <Clock className="w-3.5 h-3.5 mr-1 text-gray-400 dark:text-gray-500" />
                              {new Date(
                                submission.submittedAt
                              ).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-mono">
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
  );

  const rightPanelContent = (
    <div className="flex flex-col space-y-4 lg:h-full lg:overflow-hidden bg-white dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex-1 flex flex-col overflow-hidden shadow-sm">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50/20 dark:bg-gray-900/20">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2" />
            <select
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer text-gray-800 dark:text-gray-200"
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
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Reset Code"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              title="Copy Code"
            >
              {copySuccess ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
            <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1" />
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Code Editor */}
        <div className="relative flex-1 overflow-hidden p-3 bg-gray-50 dark:bg-gray-900 min-h-[380px] lg:min-h-0">
          <CodeEditor
            value={code[selectedLanguage] || ""}
            onChange={(val) =>
              setCode((prev) => ({ ...prev, [selectedLanguage]: val }))
            }
            language={selectedLanguage}
          />
        </div>

        {/* Status Bar */}
        <div className="px-5 py-3 bg-gray-50/70 dark:bg-gray-900/70 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center flex-shrink-0 font-medium">
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse" />
            UTF-8
          </span>
          <span>
            Ln {(code[selectedLanguage] || "").split("\n").length}
          </span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !code[selectedLanguage]?.trim()}
        className="w-full flex items-center justify-center space-x-2 px-5 py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:dark:bg-gray-800 disabled:text-gray-400 disabled:dark:text-gray-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex-shrink-0"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting Solution...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Submit Solution</span>
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0 shadow-sm relative z-20">
        <div className="px-6 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/home")}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2" />
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-sans">Daily Question</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Timer />
              <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1" />
              <ThemeToggle />
              <div className="h-4 w-[1px] bg-gray-200 dark:bg-gray-700 mx-1" />
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Panels */}
      <div className="flex-1 overflow-hidden relative z-10 bg-white dark:bg-gray-900">
        {isDesktop ? (
          <div className="h-full px-6 sm:px-8 py-6">
            <PanelGroup direction="horizontal">
              <Panel defaultSize={50} minSize={30}>
                {leftPanelContent}
              </Panel>
              
              <PanelResizeHandle className="relative flex items-center justify-center w-1.5 hover:w-2 bg-transparent hover:bg-blue-500/80 dark:hover:bg-cyan-500/80 transition-all cursor-col-resize h-full mx-2 rounded-full group animate-in fade-in duration-300">
                <div className="w-1 h-8 rounded-full bg-gray-300 dark:bg-gray-700 group-hover:bg-white transition-colors" />
              </PanelResizeHandle>

              <Panel defaultSize={50} minSize={30}>
                {rightPanelContent}
              </Panel>
            </PanelGroup>
          </div>
        ) : (
          <div className="h-full overflow-y-auto px-4 py-6 space-y-6 pb-24">
            {leftPanelContent}
            <div className="border-t border-gray-200 dark:border-gray-700 my-4" />
            {rightPanelContent}
          </div>
        )}
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
