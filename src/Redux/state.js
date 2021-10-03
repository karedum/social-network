import {act} from "@testing-library/react";
import sidebarReducer from "./sidebarPageReduce";
import profileReducer from "./ProfleReducer";
import messagesReducer from "./messages-reducer";

let store = {
    _state: {
        profilePage: {
            post: [
                {
                    id: 1,
                    message: 'Hi',
                    like: 150,
                    img: 'https://blog.athenagt.com/wp-content/uploads/2018/07/blockchain-use-cases-media.jpg'
                },
                {id: 2, message: 'Hello', like: 20, img: 'https://politykawsieci.pl/wp-content/uploads/2017/12/4.jpeg'}
            ],
            myPostText: 'ss'
        },
        messagesPage: {
            dialogs: [
                {id: 1, name: 'Gregor', img: 'https://cspromogame.ru//storage/upload_images/avatars/856.jpg'},
                {id: 2, name: 'Anatol', img: 'https://cspromogame.ru//storage/upload_images/avatars/879.jpg'},
                {id: 3, name: 'Vitaly', img: 'https://cspromogame.ru//storage/upload_images/avatars/3981.jpg'},
                {id: 4, name: 'Dmitry', img: 'https://cspromogame.ru//storage/upload_images/avatars/858.jpg'},
                {id: 5, name: 'Tanya', img: 'https://cspromogame.ru//storage/upload_images/avatars/3958.jpg'}
            ],
            messages: [
                {id: 1, message: 'Hi', sid: 1},
                {id: 2, message: 'How are you?'},
                {id: 3, message: 'Good'},
            ],
            myprofile: [
                {id: 10, name: 'Igor', img: 'https://cspromogame.ru//storage/upload_images/avatars/4081.jpg'}
            ],
            myMessageText: ''
        },
        sidebar: {
            friends: [
                {id: 1, name: 'Dmitry', img: 'https://cspromogame.ru//storage/upload_images/avatars/913.jpg'},
                {id: 2, name: 'Anatoliy', img: 'https://cspromogame.ru//storage/upload_images/avatars/823.jpeg'},
                {id: 3, name: 'Nikolay', img: 'https://cspromogame.ru//storage/upload_images/avatars/838.jpg'}
            ]
        }
    },
    _rerenderEntireTree() {
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },

    dispatch(action) {
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._rerenderEntireTree(this._state);

    }

}


export default store;