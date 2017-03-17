// the reducer function
import {createStore, combineReducers } from 'redux';

//  The below are required and map to the components dispatcher
const chatReducer = (state={}, action) => {
    switch(action.type){
    case 'USER_LIST':
        return Object.assign({},state, {users: action.users});
    }
    return state;
}
const reducers = combineReducers({
    chatState : chatReducer
})

var store = createStore(reducers);

export default store;