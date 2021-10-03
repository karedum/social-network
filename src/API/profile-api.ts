import {PhotosType, ProfileType} from "../Types/types";
import {instance, responseType, ResultCodeForCaptcha, ResultCodes} from "./api";

type meResponseDataType = {
        id: number
        email: string
        login: string
}

type LoginResponseDataType = {
        userId: number
}

export type SavePhotoResponseDataType = {
    photos: PhotosType
}
export const profileAPI = {
    profileInfo(userId: number) {
        return instance.get<ProfileType>(`/profile/` + userId).then(res => res.data)
    },
    authMe() {
        return instance.get<responseType<meResponseDataType>>(`auth/me`).then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`/profile/status/` + userId).then(res => res.data);
    },
    setStatus(status: string) {
        return instance.put<responseType>(`/profile/status`, {status: status}).then(res => res.data);
    },
    authLogin(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<responseType<LoginResponseDataType, ResultCodes | ResultCodeForCaptcha>>(`/auth/login/`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete<responseType>(`/auth/login/`).then(res => res.data)
    },
    updatePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<responseType<SavePhotoResponseDataType>>(`/profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    updateProfile(profile: ProfileType) {
        return instance.put<responseType>(`/profile`, profile).then(res => res.data)
    },
}