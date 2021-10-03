import {PhotosType, UsersArrayType} from "../Types/types";
import userReducer, {actions, initialStateType} from "./UserReducer";

let state: initialStateType
beforeEach(() => {
    state = {
        users: [
            {id: 0, name: "Dima", status: "status 0", photos: {large: null, small: null}, followed: false},
            {id: 1, name: "Anatoli", status: "status 1", photos: {large: null, small: null}, followed: true},
            {id: 2, name: "Igor", status: "status 2", photos: {large: null, small: null}, followed: false}
        ],
        currentPage: 1,
        totalPage: 250,
        pageSize: 10,
        isFetching: false,
        followingProgress: []
    };
})

test('Follow success', () => {

    const newState = userReducer(state, actions.followSuccess(2))

    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeTruthy();
})

test('Unfollow success', () => {

    const newState = userReducer(state, actions.unfollowSuccess(1))

    expect(newState.users[1].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeFalsy();
})


