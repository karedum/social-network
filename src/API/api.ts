import axios from "axios";
import {UsersArrayType} from "../Types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'fdc19ff4-7c14-489f-935b-c84a75776f07',
    }
});

export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}


export type GetItemsType= {
    items: Array<UsersArrayType>
    totalCount: number
    error: string | null
}

type followUser = {
    resultCode: ResultCodes
    messages: Array<string>
    data: {}
}
export type responseType<D = {}, RC = ResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RC
}