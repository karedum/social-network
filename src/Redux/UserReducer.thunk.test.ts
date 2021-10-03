import {actions, follow, unfollow} from "./UserReducer";
import {usersAPI} from "../API/user-api";
import {responseType, ResultCodes} from "../API/api";

jest.mock("../API/user-api");
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: responseType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {}
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})


test('Follow thunk', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result));
    const thunk = follow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleFollowingProgress(false, 1))

})

test('Unfollow thunk', async () => {
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
    const thunk = unfollow(1)
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toogleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toogleFollowingProgress(false, 1))

})