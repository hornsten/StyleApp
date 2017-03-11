// the reducer function
import {createStore, combineReducers } from 'redux';

//  The below are required and map to the components dispatcher
// const searchReducer = function(state={}, action){
//     switch(action.type){
//     case 'SEARCH_TOPIC':
//         return Object.assign({},state, {topic: action.topic});
//     case 'SEARCH_STARTDATE':
//         return Object.assign({},state, {startdate: action.startdate});
//     case 'SEARCH_ENDDATE':
//         return Object.assign({},state, {enddate: action.enddate});
//     case 'SEARCH_RESULTS':
//         return Object.assign({},state, {result: action.result});
//     case 'SEARCH_SAVED':
//         return Object.assign({},state, {saved: action.saved});
//     }
//     return state;
// }
// const reducers = combineReducers({
//     searchState = searchReducer,
//     widgetState = widgetReducer
// })

// var store = createStore(reducers);

export default store;