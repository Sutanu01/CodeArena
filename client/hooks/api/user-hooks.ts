import { useState } from "react";
const server = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ResponseType = {
  success: boolean;
  isError: boolean;
  message: string;
  data?: any;
};
 
export const useVerifyCodeforcesHandle = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResponseType | null>(null);

  const verify = async ({
    userId,
    codeforcesId,
  }: {
    userId: string;
    codeforcesId: string;
  }): Promise<ResponseType> => {
    setLoading(true);
    try {
      const response = await fetch(`${server}/api/cf/get-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          codeforcesId,
          contestId: 1000,
          index: "G",
          count: 1,
        }),
      });

      const data = await response.json();
      const submission = data.data?.submissions?.[0];

      const success =
        submission && submission.verdict === "COMPILATION_ERROR";

      const res = success
        ? {
            success: true,
            isError: false,
            message: data.message,
          }
        : {
            success: false,
            isError: true,
            message: "Codeforces handle verification failed",
          };

      setResult(res);
      return res;
    } catch (error: any) {
      const res = {
        success: false,
        isError: true,
        message:
          error.message ||
          "An error occurred while verifying Codeforces handle",
      };
      setResult(res);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { verify, loading, result };
};

//Helps in updating Codeforces info in the mongodb after user object is stored in redux with states fro ui management
export const useUpdateCodeforcesInfo = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ResponseType | null>(null);

  const update = async ({
    userId,
    codeforcesId,
  }: {
    userId: string;
    codeforcesId: string;
  }): Promise<ResponseType> => {
    setLoading(true);
    try {
      const response = await fetch(`${server}/api/cf/update-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, codeforcesId }),
      });

      const data = await response.json();
      const res = data.success
        ? {
            success: true,
            isError: false,
            message: data.message,
          }
        : {
            success: false,
            isError: true,
            message: data.message,
          };

      setResult(res);
      return res;
    } catch (error: any) {
      const res = {
        success: false,
        isError: true,
        message:
          error.message || "An error occurred while updating Codeforces info",
      };
      setResult(res);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, result,setLoading };
};

//Fetching User Data from MongoDB using Clerk ID with states for ui management
export const useGetUserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<ResponseType | null>(null);

  const fetchUser = async (clerkId: string): Promise<ResponseType> => {
    setLoading(true);
    try {
      const response = await fetch(`${server}/api/user/get-user?clerkId=${clerkId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const res = data.success
        ? {
            success: true,
            isError: false,
            message: data.message,
            data: data.data,
          }
        : {
            success: false,
            isError: true,
            message: data.message,
          };

      setResult(res);
      return res;
    } catch (error: any) {
      const res = {
        success: false,
        isError: true,
        message:
          error.message || "An error occurred while fetching user info",
      };
      setResult(res);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { fetchUser, loading, result,setLoading };
};


export const useUnlinkCodeforcesHandle = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResponseType | null>(null);
  const unlink = async (userId: string): Promise<ResponseType> => {
    setLoading(true);
    try {
      if (!userId) {
        const res = {
          success: false,
          isError: true,
          message: "User ID is required to unlink Codeforces handle",
        };
        setResult(res);
        return res;
      }
      const response = await fetch(`${server}/api/user/unlink-cf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      const res = data.success
        ? {
            success: true,
            isError: false,
            message: data.message,
          }
        : {
            success: false,
            isError: true,
            message: data.message,
          };

      setResult(res);
      return res;
    } catch (error: any) {
      const res = {
        success: false,
        isError: true,
        message:
          error.message || "An error occurred while unlinking Codeforces handle",
      };
      setResult(res);
      return res;
    } finally {
      setLoading(false);
    }
  };
  return { unlink, loading, result };
}