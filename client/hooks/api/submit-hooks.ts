import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

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

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 120;

export const useSubmitCode = (): UseSubmitCodeReturn => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [result, setResult] = useState<SubmissionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollAttemptsRef = useRef<number>(0);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, []);


  const startPolling = useCallback(
    async (jobId: string) => {
      pollAttemptsRef.current = 0;

      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }

      pollIntervalRef.current = setInterval(async () => {
        pollAttemptsRef.current += 1;

        if (pollAttemptsRef.current > MAX_POLL_ATTEMPTS) {
          clearInterval(pollIntervalRef.current!);
          pollIntervalRef.current = null;
          setError("Submission timed out. Please try again.");
          setIsSubmitting(false);
          return;
        }

        try {
          const token = await getToken();
          const response = await fetch(
            `${server}/api/practice/status/${jobId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (data.data?.status === "completed") {
            clearInterval(pollIntervalRef.current!);
            pollIntervalRef.current = null;
            setResult(data.data.result);
            setIsSubmitting(false);
          } else if (data.data?.status === "failed") {
            clearInterval(pollIntervalRef.current!);
            pollIntervalRef.current = null;
            setError(data.data.error || "Submission failed");
            setIsSubmitting(false);
          }
        } catch (err) {
          console.error("Poll error:", err);
        }
      }, POLL_INTERVAL_MS);
    },
    [getToken]
  );

  const submitCode = useCallback(
    async (data: SubmissionRequest) => {
      setIsSubmitting(true);
      setError(null);
      setResult(null);
      if (data.userId === null) {
        setError("User ID is required");
        setIsSubmitting(false);
        return;
      }
      try {
        const token = await getToken();
        const response = await fetch(`${server}/api/practice/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (response.status === 429) {
          setError("Too many submissions. Please wait a moment and try again.");
          setIsSubmitting(false);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse.success) {
          throw new Error(apiResponse.message || "Submission failed");
        }

        // Server returns 202 with { jobId } — start polling
        const jobId = apiResponse.data?.jobId;
        if (jobId) {
          startPolling(jobId);
        } else {
          throw new Error("No job ID received from server");
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
        setIsSubmitting(false);
        console.error("Submit code error:", err);
      }
    },
    [getToken, startPolling]
  );

  const reset = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
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
  const { getToken } = useAuth();

  const fetchSubmissions = useCallback(
    async ({ userId, questionId }: GetSubmissionsParams) => {
      setLoading(true);
      setError(null);

      try {
        const token = await getToken();
        const response = await fetch(
          `${server}/api/practice/get-submissions?userId=${userId}&questionId=${questionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          return { error: `HTTP error! status: ${response.status}` };
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
    [getToken]
  );

  return { submissions, loading, error, fetchSubmissions };
};
