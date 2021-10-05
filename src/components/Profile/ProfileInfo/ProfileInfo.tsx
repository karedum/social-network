import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatusHook from "./ProfileStatusHook";
import usersImage from "../../../assets/image/img.png"
import ProfileData from "../ProfileData";
import ProfileDataFormReduxForm from "../ProfileDataForm";
import {ProfileType} from "../../../Types/types";
import {Button} from "@material-ui/core";
import style from "../ProfileData.module.css"

export type PropsType = {
    profile: ProfileType | null
    updatePhoto: (file: File) => void
    isOwner: boolean
    updateProfile: (profile: ProfileType) => Promise<any>
    status: string
    setStatus: (status: string) => void
}
const ProfileInfo: React.FC<PropsType> = (props) => {

    const [editMode, setEditMode] = useState(false);

    const goToEditMode = () => {
        setEditMode(true);
    }


    if (!props.profile) {
        return <div></div>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.updatePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        props.updateProfile(formData).then(() => {
            setEditMode(false);
        });

    }

    return (
        <div>
            <img src={props.profile.photos.large || usersImage} className={s.mainPhoto} />
            {props.isOwner && <div className={style.buttons}>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    component="label"
                >
                    Добавить фото
                    <input type="file" onChange={onMainPhotoSelected} hidden/>
                </Button></div>}
            {editMode ?
                <ProfileDataFormReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> :
                <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={goToEditMode}/>}
            <ProfileStatusHook status={props.status} setStatus={props.setStatus}/>
        </div>
    )
}

export default ProfileInfo;