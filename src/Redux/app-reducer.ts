import {authMyProfile} from "./auth-reducer";
import {InferActionTypes} from "./redux-store";


const initialState = {
    initialized: false
};

type initialStateType = typeof initialState

type ActionsTypes = InferActionTypes<typeof actions>



const appReducer = (state = initialState, action: ActionsTypes): initialStateType=> {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializedApp = () => (dispatch: any) => {
    let promise = dispatch(authMyProfile());
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    });

}

export default appReducer

