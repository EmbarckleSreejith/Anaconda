import {db} from './config';
import {set,ref} from 'firebase/database';


export const create = (player1) =>{
    set(ref(db,'player/' + player1),{

    })
}