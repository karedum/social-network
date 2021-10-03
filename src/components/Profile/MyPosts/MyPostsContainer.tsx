import React from 'react';
import {actions} from "../../../Redux/ProfleReducer";
import MyPosts, {DispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {appStateType} from "../../../Redux/redux-store";


let mapStateToProps = (state: appStateType) => {
    return {
        post: state.profilePage.post,
    }


}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, appStateType>(mapStateToProps, {addPost: actions.addPostCreator})(MyPosts);

export default MyPostsContainer;