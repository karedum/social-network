import React from 'react';
import Header,{DispatchPropsType, MapPropsType } from "./Header";
import {connect} from "react-redux";
import {logout} from "../../Redux/auth-reducer";
import {appStateType} from "../../Redux/redux-store";
;

// type MapPropsType = {
//     isAuth: boolean
//     login: string | null
// }
//
// type DispatchPropsType = {
//     logout: () => void
// }



class HeaderContainer extends React.Component<MapPropsType & DispatchPropsType> {


    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: appStateType) => (
    {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
)


export default connect<MapPropsType, DispatchPropsType, {}, appStateType>(mapStateToProps, {logout})(HeaderContainer);
