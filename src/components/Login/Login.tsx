import React from 'react';
import {Field, InjectedFormProps, reduxForm, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {connect, useDispatch, useSelector} from "react-redux";
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

type PropsType = {

}


const Login: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: appStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: appStateType) => state.auth.captchaUrl)
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(authLogin(formData.email, formData.password, formData.rememberMe, formData.captcha));
    }
    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <div>
            <h1>Авторизация</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );
}

export default Login;
