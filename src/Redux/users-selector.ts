import {appStateType} from "./redux-store";

export const getsUsers = (state: appStateType) => {
    return state.userPage.users;
}

export const GetCurrentPage = (state: appStateType) => {
    return state.userPage.currentPage;
}

export const GetTotalPage = (state: appStateType) => {
    return state.userPage.totalPage;
}

export const GetPageSize = (state: appStateType) => {
    return state.userPage.pageSize;
}

export const getIsFetching = (state: appStateType) => {
    return state.userPage.isFetching;
}

export const getFollowingProgress = (state: appStateType) => {
    return state.userPage.followingProgress;
}

export const getUsersFilter = (state: appStateType) => {
    return state.userPage.filter;
}

export const getMessages = (state: appStateType) => {
    return state.messagesPage;
}


