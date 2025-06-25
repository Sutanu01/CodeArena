import { useState, useCallback } from "react";
const server = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
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
  userId: string | null;
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

export const useSubmitCode = (): UseSubmitCodeReturn => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<SubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submitCode = useCallback(async (data: SubmissionRequest) => {
    setIsSubmitting(true);
    setError(null);
    setResult(null);
    if (data.userId === null) {
      setError("User ID is required");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch(`${server}/api/practice/sumbit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: ApiResponse = await response.json();

      if (!apiResponse.success) {
        throw new Error(apiResponse.message || "Submission failed");
      }

      if (!apiResponse.data) {
        throw new Error("No data received from server");
      }

      setResult(apiResponse.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Submit code error:", err);
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

type GetSubmissionsParams = {
  userId: string;
  questionId: string;
};

export const useGetSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(
    async ({ userId, questionId }: GetSubmissionsParams) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${server}/api/practice/get-submissions?userId=${userId}&questionId=${questionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          return {error: `HTTP error! status: ${response.status}`};
        }

        const data = await response.json();
        setSubmissions(data);
        return { data };
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        console.error("Fetch submissions error:", err);
        return { error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { submissions, loading, error, fetchSubmissions };
};
