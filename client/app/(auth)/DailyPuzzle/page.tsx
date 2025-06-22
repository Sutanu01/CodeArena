"use client"
import React, { useState, useRef } from 'react';
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
  Check} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import Timer from '@/components/PuzzleTimer';

// Language type definition
type LanguageId = 'cpp' | 'java' | 'python' | 'javascript' | 'go' | 'rust';

interface Language {
  id: LanguageId;
  name: string;
  icon: string;
}

interface Submission {
  id: number;
  status: string;
  runtime: string;
  memory: string;
  language: string;
  timestamp: string;
  statusColor: string;
}

type CodeMap = Record<LanguageId, string>;

const DailyPuzzlePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'description' | 'submissions'>('description');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>('cpp');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const [code, setCode] = useState<CodeMap>({
    cpp: `class Solution {
public:
    vector<string> divideString(string s, int k, char fill) {
        
    }
};`,
    java: `class Solution {
    public List<String> divideString(String s, int k, char fill) {
        
    }
}`,
    python: `class Solution:
    def divideString(self, s: str, k: int, fill: str) -> List[str]:
        `,
    javascript: `/**
 * @param {string} s
 * @param {number} k
 * @param {character} fill
 * @return {string[]}
 */
var divideString = function(s, k, fill) {
    
};`,
    go: `func divideString(s string, k int, fill byte) []string {
    
}`,
    rust: `impl Solution {
    pub fn divide_string(s: String, k: i32, fill: char) -> Vec<String> {
        
    }
}`
  });

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      status: 'Accepted',
      runtime: '12 ms',
      memory: '10.2 MB',
      language: 'C++',
      timestamp: '2 minutes ago',
      statusColor: 'text-green-500'
    },
    {
      id: 2,
      status: 'Wrong Answer',
      runtime: 'N/A',
      memory: 'N/A',
      language: 'Python3',
      timestamp: '5 minutes ago',
      statusColor: 'text-red-500'
    }
  ]);

  const languages: Language[] = [
    { id: 'cpp', name: 'C++', icon: '🔥' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'python', name: 'Python3', icon: '🐍' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'go', name: 'Go', icon: '🔵' },
    { id: 'rust', name: 'Rust', icon: '🦀' }
  ];

  const topics = ['String', 'Simulation'];
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(prev => ({
      ...prev,
      [selectedLanguage]: e.target.value
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;
      
      // Insert tab character
      const newValue = value.substring(0, start) + '\t' + value.substring(end);
      setCode(prev => ({
        ...prev,
        [selectedLanguage]: newValue
      }));
      
      // Move cursor after the tab
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
      }, 0);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code[selectedLanguage]);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleSubmit = () => {
    // Simulate submission
    const newSubmission: Submission = {
      id: submissions.length + 1,
      status: Math.random() > 0.5 ? 'Accepted' : 'Wrong Answer',
      runtime: Math.random() > 0.5 ? `${Math.floor(Math.random() * 50)}ms` : 'N/A',
      memory: Math.random() > 0.5 ? `${(Math.random() * 20).toFixed(1)} MB` : 'N/A',
      language: languages.find(l => l.id === selectedLanguage)?.name || 'Unknown',
      timestamp: 'Just now',
      statusColor: Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'
    };
    setSubmissions(prev => [newSubmission, ...prev]);
  };

  const resetCode = () => {
    setCode(prev => ({
      ...prev,
      [selectedLanguage]: code[selectedLanguage].split('\n').map((line: string) => {
        if (line.trim().length > 0 && 
            !line.includes('{') && 
            !line.includes('}') && 
            !line.includes('class') && 
            !line.includes('def') && 
            !line.includes('func') && 
            !line.includes('var') && 
            !line.includes('impl')) {
          return '';
        }
        return line;
      }).join('\n')
    }));
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value as LanguageId);
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col">
        {/* Fullscreen Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
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

        {/* Fullscreen Code Editor */}
        <div className="flex-1 relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600 flex flex-col text-sm text-gray-500 dark:text-gray-400 font-mono overflow-y-auto">
            {code[selectedLanguage].split('\n').map((_, index) => (
              <div key={index} className="px-3 py-1 text-right leading-6 min-h-[24px]">
                {index + 1}
              </div>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            value={code[selectedLanguage]}
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
              <Timer/>
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
                    <h2 className="text-2xl font-bold mb-2">2138. Divide a String Into Groups of Size k</h2>
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                        Easy
                      </span>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">76</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Topics and Hint */}
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                  <button className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors">
                    <Lightbulb className="w-3 h-3" />
                    <span>Hint</span>
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex-1 flex flex-col overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab('description')}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'description'
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTab('submissions')}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === 'submissions'
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      Submissions
                    </button>
                  </nav>
                </div>

                <div className="p-6 flex-1 overflow-y-auto">
                  {activeTab === 'description' && (
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        A string <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">s</code> can be partitioned into groups of size <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">k</code> using the following procedure:
                      </p>
                      
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                        <li>The first group consists of the first <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">k</code> characters of the string, the second group consists of the next <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">k</code> characters of the string, and so on. Each element can be a part of <strong>exactly one</strong> group.</li>
                        <li>For the last group, if the string <strong>does not</strong> have <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">k</code> characters remaining, a character <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">fill</code> is used to complete the group.</li>
                      </ul>

                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Note that the partition is done so that after removing the <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">fill</code> character from the last group (if it exists) and concatenating all the groups in order, the resultant string should be <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">s</code>.
                      </p>

                      <p className="text-gray-700 dark:text-gray-300 mb-6">
                        Given the string <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">s</code>, the size of each group <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">k</code> and the character <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">fill</code>, return <em>a string array denoting the <strong>composition of every group</strong></em> <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">s</code> <em>has been divided into</em>.
                      </p>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold mb-2">Example 1:</h4>
                        <div className="font-mono text-sm space-y-1">
                          <div><strong>Input:</strong> s = "abcdefghi", k = 3, fill = "x"</div>
                          <div><strong>Output:</strong> ["abc","def","ghi"]</div>
                          <div><strong>Explanation:</strong> The first 3 characters "abc" form the first group. The next 3 characters "def" form the second group. The last 3 characters "ghi" form the third group.</div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Example 2:</h4>
                        <div className="font-mono text-sm space-y-1">
                          <div><strong>Input:</strong> s = "abcdefghij", k = 3, fill = "x"</div>
                          <div><strong>Output:</strong> ["abc","def","ghi","jxx"]</div>
                          <div><strong>Explanation:</strong> Similar to the previous example, we are forming the first three groups "abc", "def", and "ghi". For the last group, we only have the character 'j' so we use fill = 'x' to complete it. Thus, the four groups formed are "abc", "def", "ghi", and "jxx".</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'submissions' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Your Submissions</h3>
                      <div className="space-y-3">
                        {submissions.map((submission) => (
                          <div key={submission.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <span className={`font-medium ${submission.statusColor}`}>
                                {submission.status}
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {submission.language}
                              </span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {submission.timestamp}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                              <span>Runtime: {submission.runtime}</span>
                              <span>Memory: {submission.memory}</span>
                            </div>
                          </div>
                        ))}
                      </div>
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
                      {languages.map((lang) => (
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
                    {code[selectedLanguage].split('\n').map((_, index) => (
                      <div key={index} className="px-2 py-0.5 text-right leading-6 min-h-[24px]">
                        {index + 1}
                      </div>
                    ))}
                  </div>
                  <textarea
                    ref={textareaRef}
                    value={code[selectedLanguage]}
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDown}
                    className="w-full h-full pl-14 pr-4 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none focus:outline-none leading-6"
                    style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
                    spellCheck={false}
                  />
                </div>

                {/* Status Bar */}
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 text-xs text-gray-600 dark:text-gray-400 flex justify-between items-center flex-shrink-0">
                  <span>Ln {code[selectedLanguage].split('\n').length}</span>
                  <span>Saved</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPuzzlePage;