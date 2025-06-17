import { useState } from "react";

const server = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type responseType = {
  success: boolean;
  isError: boolean;
  message: string;
  data?: any;
};

export const useGetSubmissionInfo = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);

  async function fetchSubmission({
    userId1,
    codeforcesId1,
    userId2,
    codeforcesId2,
    contestId,
    index,
  }: {
    userId1: string;
    codeforcesId1: string;
    userId2: string;
    codeforcesId2: string;
    contestId: number;
    index: string;
  }) {
    setLoading(true);
    setError(null);
    try {
      const res1 = await fetch(`${server}/api/cf/get-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId1, codeforcesId: codeforcesId1, contestId, index }),
      });
      const json1 = await res1.json();

      const res2 = await fetch(`${server}/api/cf/get-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId2, codeforcesId: codeforcesId2, contestId, index }),
      });
      const json2 = await res2.json();

      if (!json1.success || !json2.success) {
        const errMsg = "Failed to fetch submission info";
        setError(errMsg);
        setData([]);
        return { error: errMsg, data: [] };
      } else {
        const combinedData = [...json1.data.submissions, ...json2.data.submissions];
        combinedData.sort((a: any, b: any) => {
          return new Date(b.submission_time).getTime() - new Date(a.submission_time).getTime();
        });
        setData(combinedData);
        setError(null);
        return { data: combinedData };
      }
    } catch (err: any) {
      const errMsg = err.message || "An error occurred while fetching submission info";
      setError(errMsg);
      setData([]);
      return { error: errMsg, data: [] };
    } finally {
      setLoading(false);
    }
  }

  return { loading, data, error, fetchSubmission };
};
