
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, postType, ProfileType} from "../Types/types";
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {profileAPI} from "../API/profile-api";
;

type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export const actions = {
    updateStatus: (status: string) => ({type: 'SN/PROFILE/SET_STATUS', status} as const),
    addPostCreator: (myPostForm: string) => ({type: 'SN/PROFILE/ADD-POST', myPostForm} as const),
    updatePhotoSuccess: (photos: PhotosType) => ({type: 'SN/PROFILE/UPDATE_PHOTO', photos} as const),
    setProfile: (profile: ProfileType) => ({type: 'SN/PROFILE/SET_PROFILE', profile} as const)
}

let initialState = {
    post: [
        {
            id: 1,
            message: 'Привет, как дела? Когда приедешь?',
            like: 150,
            img: 'https://get.pxhere.com/photo/person-people-portrait-facial-expression-hairstyle-smile-emotion-portrait-photography-134689.jpg'
        },
        {id: 2, message: 'Здравствуйте, отправил Вам оффер. Жду ответа', like: 20, img: 'https://get.pxhere.com/photo/man-person-people-looking-male-guy-portrait-young-student-human-facial-expression-smile-face-one-cool-head-handsome-confident-portrait-photography-facial-hair-778280.jpg'}
    ] as Array<postType>,
    profile: null as ProfileType | null,
    status: ''
};
type initialStateType = typeof initialState
const profileReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SN/PROFILE/ADD-POST':
            let body = action.myPostForm;
            return {
                ...state,
                post: [...state.post, {
                    id: 5, message: body,
                    like: 0, img: 'https://blog.athenagt.com/wp-content/uploads/2018/07/blockchain-use-cases-media.jpg'
                }]
            }

        case 'SN/PROFILE/SET_PROFILE':

            return {...state, profile: action.profile}
        case 'SN/PROFILE/SET_STATUS':
            return {...state, status: action.status}
        case 'SN/PROFILE/UPDATE_PHOTO':
            return {...state, profile: {...state.profile, photos: action.photos } as ProfileType }
        default:
            return state;
    }
}





export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.profileInfo(userId)
    dispatch(actions.setProfile(data));
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.updateStatus(data))
}

export const setStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.setStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.updateStatus(status));
    }
}

export const updatePhoto = (photo: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.updatePhoto(photo)
    if (data.resultCode === 0) {
        dispatch(actions.updatePhotoSuccess(data.data.photos));
    }
}

export const updateProfile = (formData: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    let data = await profileAPI.updateProfile(formData);

    if (data.resultCode === 0) {
        if (userId != null) {
        dispatch(getProfile(userId));
        } else {
            throw new Error("userId can't be null")
        }

    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
        return Promise.reject();
    }
}




export default profileReducer;