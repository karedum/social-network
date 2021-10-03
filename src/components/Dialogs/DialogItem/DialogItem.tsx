import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";

type Propstype = {
    id: number
    img: string
    name: string
}
const DialogItem: React.FC<Propstype> = (props) => {
    let path = "/dialogs/" + props.id;
    debugger
    return (
        <List >
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar src={props.img} />
                </ListItemAvatar>
                <NavLink to={path}>
                <ListItemText
                    primary={props.name}
                />
                </NavLink>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    )

}

export default DialogItem;
