import React, { useState, useEffect } from 'react'
import { board } from '../../types/board'
// use effect is similar to componentDidMount and componentDidUpdate and component will unmount
// use effect runs after each render!!
// each render occurs after a set state
/***
 * Experienced JavaScript developers might notice that the function passed to useEffect is 
 * going to be different on every render. This is intentional. In fact, this is what lets us 
 * read the count value from inside the effect without worrying about it getting stale. 
 * Every time we re-render, we schedule a different effect, replacing the previous one. 
 * In a way, this makes the effects behave more like a part of the render result — each effect “belongs” 
 * to a particular render. We will see more clearly why this is useful later on this page.
 */
const Board = () => { // will probably require props 
    const [boardData, setBoardData] = useState<board | undefined>(undefined); // initialize the variable to empty string

    return (
        <>
            <div><strong>placeholder for board name</strong></div>
            {/*here we will do something like boardData.columns.map(column=> <Column></Column>)*/}
            {/*same thing in the column compoenent with cards*/}

        </>
    )
}

export default Board;