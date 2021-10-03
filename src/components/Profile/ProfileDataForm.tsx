import React from 'react';
import s from "./ProfileInfo/ProfileInfo.module.css";
import {createField, GetStringKeys} from "../common/FormControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {ProfileType} from "../../Types/types";
import style from "./ProfileData.module.css";
import {Button} from "@material-ui/core";

type ProfileOwnPropsType = {
    profile: ProfileType
}


type ProfileFormValuesTypeKeys = GetStringKeys<ProfileType>
const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileOwnPropsType> & ProfileOwnPropsType> = ({profile, handleSubmit, error}) => {

    return <div className={style.profiledata_form}>
        <form onSubmit={handleSubmit}>
            <Button size="large" variant="contained" color="primary" type="submit" >
                Сохранить изменения
            </Button>
        <div><b>Полное имя:</b> {createField<ProfileFormValuesTypeKeys>('Full name', 'fullName', 'input', [])} </div>
        <div><b>Ищу работу:</b> {createField<ProfileFormValuesTypeKeys>('', 'lookingForAJob', 'input', [], {type: 'checkbox'})} </div>
        <div><b>Мои профессиональные навыки:</b> {createField<ProfileFormValuesTypeKeys>('My professional skills', 'lookingForAJobDescription', 'textarea', [])} </div>
        <div><b>Контакты:</b> {Object.keys(profile.contacts).map(key => {
                return <div>
                    <b>{key}:</b> {createField(key, 'contacts.' + key, 'input', [])}
                </div>
            }
        )}</div>
        {error && <div className={style.formSummaryError}>
            {error} </div>}
        <div className={s.descr}>
            <b>About me:</b> {createField('About me', 'AboutMe', 'textarea', [])}

        </div>

    </form>
        </div>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileOwnPropsType>({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;