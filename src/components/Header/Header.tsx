import React from 'react';
import style from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import logo from "../../assets/image/logo.png"
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {appStateType} from "../../Redux/redux-store";
import {logout} from "../../Redux/auth-reducer";

export type PropsType = {

}


const Header: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: appStateType) => state.auth.isAuth)
    const login = useSelector((state: appStateType) => state.auth.login)
    return (
        <header className={style.header}>
            <img src={logo} />

            <div className={style.auth_data}>
                {isAuth ? <div>Приветствую, {login} <Button onClick={()=> {dispatch(logout())}} variant="contained">Выйти</Button></div>
                    : <div>Приветствую, гость <NavLink to='/login'><Button variant="contained">Войти</Button></NavLink></div>
                }
            </div>
        </header>

    )
}

export default Header;