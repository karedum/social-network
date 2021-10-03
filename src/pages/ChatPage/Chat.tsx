import React, {useEffect, useState} from 'react'
import {Messages} from './Messages'
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../Redux/chat-reducer";
import {appStateType} from "../../Redux/redux-store";

export const Chat: React.FC = () => {
    const dispatch = useDispatch()
    const status = useSelector((state: appStateType) => state.chat.status)
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])



    return <div>
        {status === "error" && <div>Some error occured. Please refresh the page</div>}
        <Messages/>
        <AddMessageForm/>
    </div>
}

const AddMessageForm: React.FC<{}> = ({}) => {
    const [message, setMessage] = useState('')
    const status = useSelector((state: appStateType) => state.chat.status)
    const dispatch = useDispatch()
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <div>
        <div>
            <textarea onChange={(e) => {
                setMessage(e.currentTarget.value)
            }
            } value={message}></textarea>
        </div>
        <div>
            <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>

}