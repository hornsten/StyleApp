// the reducer function
import {createStore, combineReducers } from 'redux';

//  The below are required and map to the components dispatcher
const searchReducer = function(state={}, action){
    switch(action.type){
    case 'TEST_TOPIC':
        return Object.assign({},state, {topic: action.topic});
    }
    return state;
}
const reducers = combineReducers({
    testState : searchReducer
})

var store = createStore(reducers);

export default store;