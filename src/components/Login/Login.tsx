import React from 'react';
import {Field, InjectedFormProps, reduxForm, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {connect} from "react-redux";
import {authLogin, logout} from "../../Redux/auth-reducer";
import {createField, ElementCheckbox, ElementInput, GetStringKeys} from "../common/FormControls/FormControls";
import {required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import style from "../common/FormControls/FormControls.module.css";
import {appStateType} from "../../Redux/redux-store";
import {Button, TextField} from "@material-ui/core";

const Input:React.FC<WrappedFieldProps> = ElementInput(TextField)
const checkBox:React.FC<WrappedFieldProps> = ElementCheckbox("input")
type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
                {createField<LoginFormValuesTypeKeys>('Email', 'email', Input, [required])}
            {createField<LoginFormValuesTypeKeys>('Password', 'password', Input, [required])}
            {createField<LoginFormValuesTypeKeys>(null, 'rememberMe', checkBox, [], {type: 'checkbox'}, 'Запомнить меня')}
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', Input, [required])}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <Button  type="submit" variant="contained">Войти</Button>
            </div>
        </form>

    );
}


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

type mapDispatchPropsType = {
    authLogin: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type mapStatePropsType = {
    isAuth: boolean
    captchaUrl: string | null
}


const Login: React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.authLogin(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Авторизация</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
}


let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    }
};


export default connect(mapStateToProps, {authLogin, logout})(Login);


