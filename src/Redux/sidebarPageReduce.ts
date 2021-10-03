let initialState = {
    friends: [
        {id: 1, name: 'Dmitry', img: 'https://cspromogame.ru//storage/upload_images/avatars/913.jpg'},
        {id: 2, name: 'Anatoliy', img: 'https://cspromogame.ru//storage/upload_images/avatars/823.jpeg'},
        {id: 3, name: 'Nikolay', img: 'https://cspromogame.ru//storage/upload_images/avatars/838.jpg'}
    ] as Array<friendsType>,
};

type initialStateType = typeof initialState

export type friendsType = {
    id: number
    name: string
    img: string
}
const sidebarReducer = (state = initialState, action: any): initialStateType => {
    return state;
}


export default sidebarReducer;