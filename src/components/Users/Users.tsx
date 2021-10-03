import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import style from "./Users.module.css";

import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, follow, getUsers, unfollow} from "../../Redux/UserReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    GetCurrentPage,
    getFollowingProgress,
    GetPageSize,
    getsUsers,
    GetTotalPage,
    getUsersFilter
} from "../../Redux/users-selector";
import {useHistory} from 'react-router-dom';
import {NumberParam, StringParam, useQueryParam, useQueryParams,} from 'use-query-params';


type PropsType = {
}

type QueryParamsType = { term?: string; page?: string; friend?: string };
export const Users: React.FC<PropsType> = (props) => {

    const totalPage = useSelector(GetTotalPage)
    const pageSize = useSelector(GetPageSize)
    const currentPage = useSelector(GetCurrentPage)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getsUsers)
    const followingProgress = useSelector(getFollowingProgress)
    const dispatch = useDispatch()
    const history = useHistory()
    const MyParamFilter: any = {
        decode(value: 'false' | 'true' | 'null'): any {
            switch(value) {
                case 'null':
                    return null
                    break
                case 'true':
                    return true
                    break
                case 'false':
                    return false
                    break
            }
        },
        encode(input: false | true | null): any {
            switch(input) {
                case null:
                    return undefined
                    break
                case true:
                    return 'true'
                    break
                case false:
                    return 'false'
                    break
            }
        },
        }

    const [page, setPage] = useQueryParam('page', NumberParam);
    const [actualFilter, setFilter] = useQueryParams({friend: MyParamFilter, term: StringParam });

    useEffect(() => {
        let actualPage = currentPage
        if (!page) actualPage = Number(page)
        // @ts-ignore
        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        if (currentPage !== 1) {
            setPage(currentPage)
        } else { setPage(undefined) }
        if (!!filter.term) setFilter({term: filter.term})
        setFilter({friend: filter.friend})
    }, [filter, currentPage])

    const follows = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollows = (userId: number) => {
        dispatch(unfollow(userId))
    }

    const onPageSelect = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }

    return <div>

        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator totalItemsCount={totalPage} pageSize={pageSize} onPageSelect={onPageSelect} currentPage={currentPage}/>
        <div className={style.users_list}>
            {users.map(u => <User user={u} followingProgress={followingProgress} follow={follows} unfollow={unfollows}
                                  key={u.id}/>)}
        </div>
    </div>

}


