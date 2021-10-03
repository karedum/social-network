import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import messagesReducer from "./messages-reducer";
import sidebarReducer from "./sidebarPageReduce";
import profileReducer from "./ProfleReducer";
import userReducer from "./UserReducer";
import authReducer from "./auth-reducer";
import thunkMiddleWare, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";

let rootReducer = combineReducers({
    messagesPage: messagesReducer,
    sidebar: sidebarReducer,
    profilePage: profileReducer,
    userPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
});


type rootReducerType = typeof rootReducer
export type appStateType = ReturnType<rootReducerType>

// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, appStateType, unknown, A>

export type InferActionTypes<T> = T extends {[keys: string]: (...args: any[]) => infer u } ? u : never

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

// @ts-ignore
window.store = store;

export default store;