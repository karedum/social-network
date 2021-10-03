import {FormAction} from "redux-form";
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../API/chat-api";
import {Dispatch} from "redux";
import {v1} from 'uuid';


let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

type ChatMessageType = ChatMessageAPIType & {id: string}

const chatReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'SN/chat/MESSAGES_RECEVIED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
                    .filter((e, index, array) => index >= array.length - 100)
            }
        case 'SN/chat/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state;
    }
}

const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: 'SN/chat/MESSAGES_RECEVIED', payload: {messages}
    } as const),
    statusChanged: (status: StatusType) => ({
        type: 'SN/chat/STATUS_CHANGED', payload: {status}
    } as const)
}

let _newMessageHandler: ((mesages: ChatMessageAPIType[]) => void) | null = null
let _statusChangedHandler: ((status: StatusType) => void) | null = null

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.susbcribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.susbcribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.start()
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsusbcribe('messages-received', newMessagesHandlerCreator(dispatch))
    chatAPI.unsusbcribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
    }

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}


type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
type initialStateType = typeof initialState;
export default chatReducer;

