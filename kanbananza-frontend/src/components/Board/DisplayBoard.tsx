import React, { useState } from 'react'
import { board } from '../../types/board'
import { createBoard } from '../../api/boardApi'

const DisplayBoard = () => {

    const [label, setLabel] = useState<string | undefined>(undefined)

    const onBtnClick = () => {
        if (label) {
            try {
                createBoard({ ownerId: "6028930e486dd03312c8cbab", label: label })
            } catch (err) {
                console.log(err)
            }
        }

    }

    return (

        <>
            <div>
                <input type="text" onChange={(e) => setLabel(e.target.value)}></input>
                <button onClick={onBtnClick}>Create Board</button>
            </div>
        </>
    )
}
export default DisplayBoard