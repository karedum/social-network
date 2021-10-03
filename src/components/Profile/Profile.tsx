import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../Types/types";

type PropsType = {
    profile: ProfileType | null
    updatePhoto: (file: File) => void
    isOwner: boolean
    updateProfile: (profile: ProfileType) => Promise<any>
    status: string
    setStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = (props) => {

    return (
        <div>
        <ProfileInfo updateProfile={props.updateProfile} updatePhoto={props.updatePhoto} profile={props.profile} status={props.status} setStatus={props.setStatus} isOwner={props.isOwner}/>
      <MyPostsContainer />

      </div>
    );
}

export default Profile;