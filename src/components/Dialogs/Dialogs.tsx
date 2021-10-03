import React from 'react';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import {getMessages} from "../../Redux/users-selector";

type PathParamsType = {
    userId: string,
}


const Dialogs: React.FC<RouteComponentProps<PathParamsType>> = (props: any) => {
    let messagesPage = useSelector(getMessages);
    if (props.match.params.userId) { // @ts-ignore
        return (<Message messagesPage={messagesPage} userId={props.match.params.userId}/>
        )
    }

    return (
        <div>
            {messagesPage.dialogs
                .map(dialog => <DialogItem name={dialog.name} id={dialog.id} img={dialog.img} key={dialog.id}/>)
            }
        </div>

    );
}

export default withRouter(Dialogs);
