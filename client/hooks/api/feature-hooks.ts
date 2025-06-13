import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${server}/api/features/leaderboard?page=${pageNumber}&limit=${limitNumber}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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



//Implement CRON in backend to update daily data

// export const useUpdateDaily = () => {
//   const updateDaily = async (
//     userId: string,
//     didLogin: boolean
//   ): Promise<responseType> => {
//     try {
//       const res = await fetch(`${server}/api/features/daily-update`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId, didLogin }),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         return {
//           success: false,
//           isError: true,
//           message: data.message,
//         };
//       }

//       return {
//         success: true,
//         isError: false,
//         message: data.message,
//         data: data.data,
//       };
//     } catch (error) {
//       return {
//         success: false,
//         isError: true,
//         message: "An error occurred while updating daily data.",
//       };
//     }
//   };

//   return updateDaily;
// };

