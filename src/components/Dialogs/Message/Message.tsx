import React from 'react';
import s from './../Dialogs.module.css';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, ElementInput, GetStringKeys} from "../../common/FormControls/FormControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {MessagesActions} from "../../../Redux/messages-reducer";
import {getMessages} from "../../../Redux/users-selector";
import {appStateType} from "../../../Redux/redux-store";
import {Card, CardContent, Typography} from "@material-ui/core";
import style from "../Dialogs.module.css";

type PropsType = {
    addMesCreator: (values: string) => void

}
// @ts-ignore
const Message: React.FC<PropsType> = ({messagesPage, userId}) => {
    const dispatch = useDispatch();

    let addMessage = (values: NewMessageFormType) => {
        dispatch(MessagesActions.addMesCreator(values.newMessageBody));
    }
    let myProfile = useSelector((state: appStateType) => state.profilePage.profile)

    //Сделать фильтрацию

    return (<div className={style.chat__content}>
            {
                messagesPage.messages.map((mes: any) => {
                        debugger
                        if (mes.id === myProfile?.userId) {

                            return <div key={mes.id} className={style.chat__item}>
                                <img src="https://cspromogame.ru//storage/upload_images/avatars/3981.jpg" alt="photo"
                                     className={style.chat__person_avatar}/>

                                <div className={style.chat__messages}>
                                    <div className={style.chat__message}>
                                        <div className={style.chat__message_content}>{mes.message}</div>
                                    </div>

                                </div>
                            </div>
                        } else {
                            return <div className={`${style.chat__item} ${style.chat__item_responder}`}>
                                <img src="https://cspromogame.ru//storage/upload_images/avatars/856.jpg" alt="photo"
                                     className={style.chat__person_avatar}/>

                                <div className={style.chat__messages}>
                                    <div className={style.chat__message}>
                                        <div className={style.chat__message_content}>{mes.message}</div>
                                    </div>

                                </div>
                            </div>
                        }
                    }
                )
            }
            <AddMessageRedux onSubmit={addMessage}/>
        </div>
    )
}


const Textarea = ElementInput("textarea")
const maxLength50 = maxLengthCreator(50);

export type NewMessageFormType = {
    newMessageBody: string
}
type NewMessageFormTypeKeys = GetStringKeys<NewMessageFormType>
type OwnPropsType = {}

const addMessageForm: React.FC<InjectedFormProps<NewMessageFormType, OwnPropsType> & OwnPropsType> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormTypeKeys>('Enter your message', 'newMessageBody', Textarea, [required, maxLength50])}
            </div>
            <div>
                <button>Отправить сообщение</button>
            </div>
        </form>
    )
}

const AddMessageRedux = reduxForm<NewMessageFormType, OwnPropsType>({form: "dialogAddMessageForm"})(addMessageForm)


export default Message;
