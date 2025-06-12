
const server = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type responseType = {
    success: boolean;
    isError: boolean;
    message: string;
    data?: any;
}

type GetQuestionParams = {
    userId1: string;
    userId2: string;
    lowerRating: number;
    upperRating: number;
    tags: string[];
};

const useGetQuestion = async ({
    userId1,
    userId2,
    lowerRating,
    upperRating,
    tags,
} : GetQuestionParams): Promise<responseType> => {
    const response = await fetch(`${server}/api/cf/get-contest-question`, {
        method: "GET",
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


const useGetSubmissionInfo = async (userId: string,codeforcesId:string, contestId: number, index: string): Promise<responseType> => {
    const response = await fetch(`${server}/api/cf/get-status`, {
        method: "GET",
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



export {useGetQuestion,useGetSubmissionInfo}