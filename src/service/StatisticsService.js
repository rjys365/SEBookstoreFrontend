import {BACKEND_SERVER_ENDPOINT} from "../const/book-const";

export const getBookStatisticsByTimeRange=async (timeRange)=>{
    const response = await fetch(
        BACKEND_SERVER_ENDPOINT+
        'statistics/top_books?startDate='+encodeURIComponent(timeRange[0])+
        '&endDate='+encodeURIComponent(timeRange[1])
    );
    return await response.json();
}

export const getUserStatisticsByTimeRange=async (timeRange)=>{
    const response = await fetch(
        BACKEND_SERVER_ENDPOINT+
        'statistics/user_stats/?startDate='+encodeURIComponent(timeRange[0])+
        '&endDate='+encodeURIComponent(timeRange[1])
    );
    return await response.json();
}

export const getUserStatisticsByTimeRangeAndUserId=async (timeRange,userId)=>{
    const response = await fetch(
        BACKEND_SERVER_ENDPOINT+
        'statistics/user_stats/'+userId.toString()+'?startDate='+encodeURIComponent(timeRange[0])+
        '&endDate='+encodeURIComponent(timeRange[1])
    );
    return await response.json();
}

export const getBookStatisticsByTimeRangeAndUserId=async (timeRange,userId)=>{
    const response = await fetch(
        BACKEND_SERVER_ENDPOINT+
        'statistics/top_books?startDate='+encodeURIComponent(timeRange[0])+
        '&endDate='+encodeURIComponent(timeRange[1])+'&userId='+userId.toString()
    );
    return await response.json();
}
