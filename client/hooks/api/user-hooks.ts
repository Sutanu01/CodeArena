
const server = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type responseType = {
    success: boolean;
    isError: boolean;
    message: string;
    data?: any;
}

const useVerifyCodeforcesHandle = async ({userId,codeforcesId}:{userId:string,codeforcesId:string}): Promise<responseType> => {
    const response  = await fetch(`${server}/api/cf/get-status`,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
             userId,codeforcesId, contestId:1000, index:"G" , count:1
        }),
    })
    const data =await response.json();
    const submission = data.data?.submissions?.[0];
    if(!submission || submission.verdict
     !== 'COMPILATION_ERROR') {
        return {
            success: false,
            isError: true,
            message: "Codeforces handle verification failed",
        }
    }
    return {
        success: true,
        isError: false,
        message: data.message,
    }
}

const useUpdateCodeforcesInfo = async ({userId, codeforcesId}:{userId:string, codeforcesId:string}): Promise<responseType> => {
    const response = await fetch(`${server}/api/cf/update-info`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, codeforcesId }),
    });
    const data = await response.json();
    if (!data.success) {
        return {
            success: false,
            isError: true,
            message: data.message,
        };
    }
    return {
        success: true,
        isError: false,
        message: data.message,
    };
}


const useGetUserInfo = async (username: string): Promise<responseType> => {
    const response = await fetch(`${server}/api/user/get-user?username=${encodeURIComponent(username)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!data.success) {
        return {
            success: false,
            isError: true,
            message: data.message,
        };
    }
    return {
        success: true,
        isError: false,
        message: data.message,
        data: data.data,
    };
}

export {useVerifyCodeforcesHandle,useUpdateCodeforcesInfo,useGetUserInfo};