import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

const server = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type responseType = {
  success: boolean;
  isError: boolean;
  message: string;
  data?: any;
};

export const useLeaderboardInfo = (pageNumber: number, limitNumber: number) => {
  const [response, setResponse] = useState<responseType>({
    success: false,
    isError: false,
    message: "",
    data: null,
  });
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const res = await fetch(
          `${server}/api/features/leaderboard?page=${pageNumber}&limit=${limitNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          }
        );
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
      } catch (error) {
        setResponse({
          success: false,
          isError: true,
          message: "An error occurred while fetching leaderboard data.",
        });
      }
    };

    fetchData();
  }, [pageNumber, limitNumber]);

  return response;
};

