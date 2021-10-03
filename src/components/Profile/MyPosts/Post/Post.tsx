import React from 'react';
import s from './Post.module.css';

type PropsType = {
    img: string
    message: string
    like: number
}

const Post: React.FC<PropsType> = (props) => {
    return (

            <div className={s.item}>
              <img src={props.img} />
              <span>{props.message}</span>
            </div>
            
    );
}

export default Post;