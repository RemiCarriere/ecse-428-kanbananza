import { board } from '../types/board'
import API from './api'

/** template */

export const createBoard = (boardData: board) => {
    API.post('/board', { label: boardData.label, ownerId: boardData.ownerId }).then(res => {
        console.log(res.data);
    }).catch(err => console.log(err))
}
const getBoard = (id: number) => {

}

const updateBoard = (id: number, data) => {
}