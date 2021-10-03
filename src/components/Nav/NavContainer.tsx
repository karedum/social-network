import React from 'react';
import s from './Nav.module.css';
import {NavLink} from "react-router-dom";
import Friends from "../Friends/Friends";
import {connect} from "react-redux";
import Nav from "./Nav";
import {appStateType} from "../../Redux/redux-store";

type mapStatePropsType = ReturnType<typeof mapStateToProps>
const mapStateToProps = (state: appStateType) => {
    return {
        friends: state.sidebar.friends
    }
}

const NavContainer = connect(mapStateToProps, {})(Nav);

export default NavContainer;