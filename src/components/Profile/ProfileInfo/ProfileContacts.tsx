import React from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatus from "./ProfileStatus";
import ProfileStatusHook from "./ProfileStatusHook";
import usersImage from "../../../assets/image/img.png"

type PropsType = {
    contactTitle: string
    contactValue: string
}
const Contacts: React.FC<PropsType> = ({contactTitle, contactValue}) => {

    return <div><b>{contactTitle}</b>: {contactValue}</div>
}

export default Contacts;