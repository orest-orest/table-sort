import {SET_RECEIVED_DATA} from '../actions/actions'


let initialState = {

}


export const MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RECEIVED_DATA: {
            return {
                ...state,
                data: action.receivedData
            }
        }
        default: {
            return state
        }
    }
}


