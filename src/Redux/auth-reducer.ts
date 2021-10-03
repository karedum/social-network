import {FormAction, stopSubmit} from "redux-form";
import { ResultCodeForCaptcha, ResultCodes} from "../API/api";
import {securityAPI} from "../API/security-api";
import {profileAPI} from "../API/profile-api";
import {BaseThunkType, InferActionTypes} from "./redux-store";


let initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};
type initialStateType = typeof initialState;
const authReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SN/auth/SET_USER_DATA':
        case 'SN/auth/auth/GET_CAPTCHA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

const actions = {
    setAuthUserData:(id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({
        type: 'SN/auth/SET_USER_DATA',
        payload: {id, login, email, isAuth}
    } as const),
    getCaptchaSuccess: (captchaUrl: string) => ({
        type: 'SN/auth/auth/GET_CAPTCHA',
        payload: {captchaUrl}
    } as const)
}
type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export default authReducer;


export const authMyProfile = (): ThunkType => {
    return async (dispatch) => {
        let meData = await profileAPI.authMe();
        if (meData.resultCode === 0) {
            let {id, login, email} = meData.data;
            dispatch(actions.setAuthUserData(id, login, email, true));
        }
    }
};

export const authLogin = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
       const LoginData = await profileAPI.authLogin(email, password, rememberMe, captcha);
            if (LoginData.resultCode === ResultCodes.Success) {
                dispatch(authMyProfile());
            } else {
                if (LoginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                    dispatch(getCaptchaUrl());
                }
                let message = LoginData.messages.length > 0 ? LoginData.messages[0] : "Some error";
                dispatch(stopSubmit('login', {_error: message}));
            }
    }

export const logout = (): ThunkType => async (dispatch) => {
        const data = await profileAPI.logout();
            if (data.resultCode === 0) {
                dispatch(actions.setAuthUserData(null, null, null, false));
            }
    }

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaSuccess(captchaUrl));
};


