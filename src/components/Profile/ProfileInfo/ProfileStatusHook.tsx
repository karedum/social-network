import React, {ChangeEvent, useEffect, useState} from 'react';

type PropsType = {
    status: string
    setStatus: (status: string) => void

}
const ProfileStatusHook: React.FC<PropsType> = (props) => {


    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);


    useEffect(() => {
        setStatus(props.status);
    },[props.status]);
    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.setStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }


    return (
        <div>
            {!editMode &&
            <div>
                <b>Status: </b> <span onDoubleClick={activateEditMode}>{props.status || 'Not status'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                       value={status}/>
            </div>
            }
        </div>
    )

}

export default ProfileStatusHook;