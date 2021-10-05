import React from 'react';
import style from "./Users.module.css";
import usersImage from "../../assets/image/img.png";
import {NavLink} from "react-router-dom";
import {ProfileType, UsersArrayType} from "../../Types/types";
import {Button} from "@material-ui/core";

type UserType = {
    user: UsersArrayType
    followingProgress: Array<Number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: React.FC<UserType> = ({user, followingProgress, follow, unfollow}) => {
    return <div>
        <NavLink to={'/profile/' + user.id}>
            <img className={style.user_image} src={user.photos.small != null ? user.photos.small : usersImage}/>
        </NavLink>
        <div className={style.friends_button}>
            {user.followed
                ? <Button size="large" variant="contained" color="primary" disabled={followingProgress.some(id => id === user.id)} onClick={() => {
                    unfollow(user.id)
                }}>Отписаться</Button>
                : <Button size="large" variant="contained" color="primary" disabled={followingProgress.some(id => id === user.id)} onClick={() => {
                    follow(user.id)
                }}>Подписаться</Button>}
        </div>
        <div>{user.name}</div>
        <div>{user.status}</div>
        <div>{'user.location.city'}</div>
        <div>{'user.location.country'}</div>
    </div>
}


export default User;