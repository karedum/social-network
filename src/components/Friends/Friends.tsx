import React from 'react';
import s from "./Friends.module.css";
import {friendsType} from "../../Redux/sidebarPageReduce";

const Friends: React.FC<friendsType> = (props) => {
    return (
        <div>
            <img className={s.friend_img} src={props.img}/>
            <span>{props.name}</span>
        </div>
    );
}
export default Friends;
