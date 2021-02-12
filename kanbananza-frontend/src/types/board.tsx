import { card } from './card'
import { column } from './column'
export interface board {
    name: string
    columns: column[]
    cards: card[]
    // other data we might need later 
}