import style from "./Paginator.module.css";
import React, {useState} from "react";
import {Button} from "@material-ui/core";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    onPageSelect: (pageNumber: number) => void
    currentPage: number
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, onPageSelect, currentPage, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div>
        {portionNumber > 1 && <Button className={style.prev_button} size="large" variant="contained" color="primary" onClick={() => {
            setPortionNumber(portionNumber - 1)
        }}>Назад</Button>}
        {pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map(p => {
                return <span className={style.paginator} onClick={(e) => {
                    onPageSelect(p)
                }}>{p}</span>
            })}
        {portionCount > portionNumber && <Button className={style.next_button} size="large" variant="contained" color="primary" onClick={() => {
            setPortionNumber(portionNumber + 1)
        }}>Вперед</Button>}



    </div>
}


export default Paginator