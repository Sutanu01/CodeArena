import { useState, useCallback } from 'react';

export interface TestResult {
  testCaseIndex: number;
  pass: boolean;
  expected: string;
  got: string;
  status: string;
  error: string | null;
}

export interface SubmissionSummary {
  total: number;
  passed: number;
  failed: number;
  allPassed: boolean;
}

export interface SubmissionResponse {
  questionId: string;
  summary: SubmissionSummary;
  results: TestResult[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: SubmissionResponse | null;
}

export type LanguageId = 
  | "C++" 
  | "Java" 
  | "Python" 
  | "JavaScript" 
  | "Rust" 
  | "TypeScript";

export interface SubmissionRequest {
  questionId: string;
  language: LanguageId;
  source_code: string;
}

interface UseSubmitCodeReturn {
  submitCode: (data: SubmissionRequest) => Promise<void>;
  isSubmitting: boolean;
  result: SubmissionResponse | null;
  error: string | null;
  reset: () => void;
}

const API_BASE_URL = 'http://localhost:5000';

export const useSubmitCode = (): UseSubmitCodeReturn => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<SubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitCode = useCallback(async (data: SubmissionRequest) => {
    setIsSubmitting(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/practice/sumbit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: ApiResponse = await response.json();

      if (!apiResponse.success) {
        throw new Error(apiResponse.message || 'Submission failed');
      }

      if (!apiResponse.data) {
        throw new Error('No data received from server');
      }

      setResult(apiResponse.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      console.error('Submit code error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setResult(null);
    setError(null);
  }, []);

  return {
    submitCode,
    isSubmitting,
    result,
    error,
    reset,
  };
};