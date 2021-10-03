import React from 'react';
import style from './Header.module.css';
import {Link, NavLink} from "react-router-dom";
import logo from "../../assets/image/logo.png"
import {Button} from "@material-ui/core";

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = ({isAuth, login, logout}) => {
    return (
        <header className={style.header}>
            <img src={logo} />

            <div className={style.auth_data}>
                {isAuth ? <div>Приветствую, {login} <Button onClick={logout} variant="contained">Выйти</Button></div>
                    : <div>Приветствую, гость <NavLink to='/login'><Button variant="contained">Войти</Button></NavLink></div>
                }
            </div>
        </header>

    );
}

export default Header;