import React from 'react';
import {useSelector} from "react-redux";
import {Users} from "./Users";
import {Prealoder} from "../common/Preloader";
import {getIsFetching} from "../../Redux/users-selector";


type UserPagePropsType = {}
export const UserPage: React.FC<UserPagePropsType> = (props) => {
const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching && <Prealoder/>}
        <Users />
    </>
}

