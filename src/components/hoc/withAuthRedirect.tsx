import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {appStateType} from "../../Redux/redux-store";

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {
}

export function withAuthRedirect<WCP> (WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props
            if (!isAuth) return <Redirect to={'/login'} />;

            return <WrappedComponent {...restProps as WCP} />
    }


  let mapStateToProps = (state: appStateType) => {
        return {
            isAuth: state.auth.isAuth
        }
    };

    let ConnectedRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, appStateType>(mapStateToProps, {})(RedirectComponent);

    return ConnectedRedirectComponent;
}