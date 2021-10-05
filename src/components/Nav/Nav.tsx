import React from 'react';
import Friends from "../Friends/Friends";
import {friendsType} from '../../Redux/sidebarPageReduce';
import { MenuItem, MenuList} from "@material-ui/core";
import style from "./Nav.module.css"
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
import {appStateType} from "../../Redux/redux-store";

type Propstype = {

}


const Nav: React.FC<Propstype> = () => {
    const friends = useSelector((state: appStateType) => state.sidebar.friends)
    let sideBar = friends
        .map((friend) => <Friends key={friend.id} name={friend.name} img={friend.img} id={friend.id}/>);
    return (
        <div className={style.nav}>
            <MenuList>
                <MenuItem component={Link} to="/profile">Profile</MenuItem>
                <MenuItem component={Link} to="/dialogs">Messages</MenuItem>
                <MenuItem component={Link} to="/news">News</MenuItem>
                <MenuItem component={Link} to="/music">Music</MenuItem>
                <MenuItem component={Link} to="/users">Users</MenuItem>
                <MenuItem component={Link} to="/chat">Chat</MenuItem>
            </MenuList>
        </div>
    );
}


export default Nav;