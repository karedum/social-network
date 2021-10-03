import {updateObjectInArray} from "../utils/object-helpers";
import {UsersArrayType} from "../Types/types";
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../API/user-api";
import {responseType} from "../API/api";


let initialState = {
    users: [] as Array<UsersArrayType>,
    currentPage: 1,
    totalPage: 250,
    pageSize: 10,
    isFetching: false,
    followingProgress: [] as Array<number>,
    filter: {
        term: '',
        friend: null as null | boolean
    }
};


export type initialStateType = typeof initialState
export type FilterType = typeof initialState.filter

export const actions = {
    followSuccess: (userId: number) => ({type: 'SN/USER/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'SN/USER/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersArrayType>) => ({type: 'SN/USER/SET_USERS', users} as const),
    setFilter: (filter: FilterType) => ({type: 'SN/USER/SET_FILTER', payload: filter} as const),
    setCurrentPage: (current: number) => ({type: 'SN/USER/CURRENT_PAGE', current} as const),
    totalPageF: (total: number) => ({type: 'SN/USER/TOTAL_PAGE', total} as const),
    toogleFetching: (isFetching: boolean) => ({type: 'SN/USER/TOOGLE_FETCHING', isFetching} as const),
    toogleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'SN/USER/TOOGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const userReducer = (state = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {
        case 'SN/USER/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'SN/USER/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'SN/USER/SET_USERS':
            return {...state, users: action.users}
        case 'SN/USER/SET_FILTER':
            return {...state, filter: {...state.filter, ...action.payload}}
        case 'SN/USER/CURRENT_PAGE':
            return {...state, currentPage: action.current}
        case 'SN/USER/TOTAL_PAGE':
            return {...state, totalPage: action.total}
        case 'SN/USER/TOOGLE_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'SN/USER/TOOGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingProgress: action.isFetching ? [...state.followingProgress, action.userId] : state.followingProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }
}

export default userReducer;


export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType =>
    async (dispatch, getState) => {
        dispatch(actions.toogleFetching(true));
        dispatch(actions.setFilter(filter));
        const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toogleFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.totalPageF(data.totalCount));
        dispatch(actions.setCurrentPage(currentPage));
    };

const followUnfollowFlow = async (userId: number, dispatch: Dispatch<ActionsTypes>, apiMethod: (userId: number) => Promise<responseType>, actionCreator: (userId: number) => ActionsTypes) => {

    dispatch(actions.toogleFollowingProgress(true, userId));
    let data = await apiMethod(userId);
    if (data.resultCode == 0) {

        dispatch(actionCreator(userId))
    }
    dispatch(actions.toogleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(userId, dispatch, usersAPI.follow.bind(usersAPI), actions.followSuccess);

}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(userId, dispatch, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
}