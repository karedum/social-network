import {InferActionTypes} from "./redux-store";

type DialogType = {
    id: number
    name: string
    img: string
}

type MessagesType = {
    id: number
    message: string
    sid: number
}

type MyprofileType = {
    id: number
    name: string
    img: string
}

export const initialState = {
    dialogs: [
        {id: 1, name: 'Григорий Павлов', img: 'https://cspromogame.ru//storage/upload_images/avatars/856.jpg'},
        {id: 2, name: 'Анатолий Соляник', img: 'https://cspromogame.ru//storage/upload_images/avatars/879.jpg'},
        {id: 3, name: 'Виталий Городничев', img: 'https://cspromogame.ru//storage/upload_images/avatars/3981.jpg'},
        {id: 4, name: 'Дмитрий Сухоруков', img: 'https://cspromogame.ru//storage/upload_images/avatars/858.jpg'},
        {id: 5, name: 'Татьяна Карпунина', img: 'https://cspromogame.ru//storage/upload_images/avatars/3958.jpg'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Здравствуйте, видела Ваше резюме. Ждем Вас на собеседовании', sid: 1},
        {id: 2, message: 'Здравствуйте, это компания Некст', sid: 2},
        {id: 17503, message: 'Привет, ты уже реализовал свою мечту?', sid: 3},
        {id: 17503, message: 'Здравствуйте, это компания ', sid: 4},
        {id: 3, message: 'Привет, встретимся сегодня', sid: 5},
    ] as Array<MessagesType>,
    myprofile: [
        {id: 10, name: 'Igor', img: 'https://cspromogame.ru//storage/upload_images/avatars/4081.jpg'}
    ] as Array<MyprofileType>,
};

export type initialStateType = typeof initialState

const messagesReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SN/DIALOGS/ADD-MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {id: 1, message: action.newMessageBody, sid: 1}]
            }
        default:
            return state;
    }
}

export default messagesReducer;

export const MessagesActions = {
    addMesCreator: (newMessageBody: string) => ({type: 'SN/DIALOGS/ADD-MESSAGE', newMessageBody} as const)
}

type ActionsTypes = InferActionTypes<typeof MessagesActions>

