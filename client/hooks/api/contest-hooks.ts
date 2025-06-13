import { useEffect, useState } from "react";

const server = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type responseType = {
  success: boolean;
  isError: boolean;
  message: string;
  data?: any;
};

type GetQuestionParams = {
  userId1: string;
  userId2: string;
  lowerRating: number;
  upperRating: number;
  tags: string[];
};

export const useGetQuestion = ({
  userId1,
  userId2,
  lowerRating,
  upperRating,
  tags,
}: GetQuestionParams) => {
  const [response, setResponse] = useState<responseType>({
    success: false,
    isError: false,
    message: "",
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${server}/api/cf/get-contest-question`, {
          method: "POST", // ✅ changed to POST since GET cannot have body
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId1,
            userId2,
            lowerRating,
            upperRating,
            tags,
          }),
        });
        const data = await res.json();
        if (!data.success) {
          setResponse({
            success: false,
            isError: true,
            message: data.message,
          });
        } else {
          setResponse({
            success: true,
            isError: false,
            message: data.message,
            data: data.data,
          });
        }
      } catch (error: any) {
        setResponse({
          success: false,
          isError: true,
          message:
            error.message ||
            "An error occurred while fetching the question",
        });
      }
    };

    fetchData();
  }, [userId1, userId2, lowerRating, upperRating, tags]);

  return response;
};

export const useGetSubmissionInfo = (
  userId: string,
  codeforcesId: string,
  contestId: number,
  index: string
) => {
  const [response, setResponse] = useState<responseType>({
    success: false,
    isError: false,
    message: "",
    data: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${server}/api/cf/get-status`, {
          method: "POST", // ✅ changed to POST since GET cannot have body
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            codeforcesId,
            contestId,
            index,
          }),
        });
        const data = await res.json();
        if (!data.success) {
          setResponse({
            success: false,
            isError: true,
            message: data.message,
          });
        } else {
          setResponse({
            success: true,
            isError: false,
            message: data.message,
            data: data.data,
          });
        }
      } catch (error: any) {
        setResponse({
          success: false,
          isError: true,
          message:
            error.message ||
            "An error occurred while fetching submission info",
        });
      }
    };

    fetchData();
  }, [userId, codeforcesId, contestId, index]);

  return response;
};
