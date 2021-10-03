import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileContacts from "./ProfileInfo/ProfileContacts";
import s from "./ProfileInfo/ProfileInfo.module.css";
import ProfileStatusHook from "./ProfileInfo/ProfileStatusHook";
import {ContactType, ProfileType} from "../../Types/types";
import {Button} from "@material-ui/core";
import style from "./ProfileData.module.css"

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void

}
const ProfileData: React.FC<PropsType> = ({profile, isOwner, goToEditMode}) => {

    return <div>
        {isOwner &&
            <div className={style.buttons}><Button size="large" onClick={goToEditMode} variant="contained" color="primary">
            Редактировать профиль
            </Button></div>}
        <div className={style.fullname}><b>Полное имя:</b> {profile.fullName} </div>
        <div><b>Ищу работу:</b> {profile.lookingForAJob ? "Yes" : "No"} </div>
        {profile.lookingForAJob && <div><b>Мои профессиольные навыки: </b> {profile.lookingForAJobDescription} </div>}
        <div><b>Контакты:</b> {Object.keys(profile.contacts).map(key => {
                return <ProfileContacts key={key} contactTitle={key}
                                        contactValue={profile.contacts[key as keyof ContactType]}/>
            }
        )}</div>

        <div className={s.descr}>
            <b>About me:</b> {profile.aboutMe}
        </div>

    </div>
}

export default ProfileData;