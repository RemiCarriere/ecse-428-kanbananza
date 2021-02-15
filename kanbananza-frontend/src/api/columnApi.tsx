import API from './api'
import { column } from '../types/column'

const createColumn = (columnData: column): any => {
    return API.post('/column', columnData).then(res => console.log(res)).catch(err => console.log(err))
}