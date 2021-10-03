import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {createField, ElementInput, GetStringKeys} from "../../common/FormControls/FormControls";
import {LoginFormValuesType} from "../../Login/Login";
import {postType} from "../../../Types/types";
import {Button} from "@material-ui/core";

export type MapPropsType = {
    post: Array<postType>
}

export type DispatchPropsType = {
    addPost: (myPostText: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType>= (props) => {

    let postElement = [...props.post].map(post => <Post key={post.id} message={post.message} img={post.img} like={post.like}/>);
    let addPost = (values: MyPostFormValuesType) => {
        props.addPost(values.myPostForm);
    }


    return (
        <div className={s.postBlock}>

            <h3>Мои посты</h3>
<MyPostReduxForm onSubmit={addPost} />
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    );
}
const Textarea = ElementInput("textarea")
const maxLength10 = maxLengthCreator(10);

const MyPostsForm: React.FC<InjectedFormProps<MyPostFormValuesType, MyPostFormOwnProps> & MyPostFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<MyPostFormValuesTypeKeys>('Enter your message', 'myPostForm', Textarea, [required, maxLength10])}
            </div>
            <div>
                <Button size="large" variant="contained" color="primary" type="submit" >
                    Добавить пост
                </Button>
            </div>
        </form>
    )
}

const MyPostReduxForm = reduxForm<MyPostFormValuesType, MyPostFormOwnProps>({form: "myPostForm"})(MyPostsForm)

type MyPostFormOwnProps = {

}

type MyPostFormValuesType = {
    myPostForm: string
}
type MyPostFormValuesTypeKeys = GetStringKeys<MyPostFormValuesType>

export default MyPosts;