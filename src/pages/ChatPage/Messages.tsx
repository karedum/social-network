import React, {UIEventHandler, useEffect, useRef, useState} from 'react'
import {useSelector} from "react-redux";
import {appStateType} from "../../Redux/redux-store";
import {ChatMessageAPIType} from "../../API/chat-api";


export const Messages: React.FC = () => {
    const messages = useSelector((state: appStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300 ) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages])
    return <div style={{height: '400px', overflow: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m, item) => <Message message={m} key={m.id}/>)}
        <div ref={messagesAnchorRef}></div>
    </div>
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    console.log('///Message')
    return <div>
        <img src={message.photo} style={{height: '50px'}}/> <b>{message.userName}</b>
        <br/>
        <b>{message.message}</b>
    </div>

}
)

