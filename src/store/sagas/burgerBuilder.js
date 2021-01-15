import axios from "../../axios-orders"
import {put} from "redux-saga/effects"
import * as actions from "../actions/index" 

export function* initIngredientsSaga(action){
            const response = yield axios.get('/ingredients.json')
            try{
                yield put(actions.setIngredients(response.data))
            }catch{
                yield put(actions.fetchIngredientsFailed());
            }
    
}