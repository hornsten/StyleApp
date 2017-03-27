// the reducer function
import {createStore, combineReducers } from 'redux';

//  The below are required and map to the components dispatcher
const chatReducer = (state={}, action) => {
    switch(action.type){
        case 'USER_LIST':
            return Object.assign({},state, {users: action.users});
        case 'ROOM_LIST':
            return Object.assign({},state, {rooms: action.rooms});
        case 'UPDATE_ROOM':
            return Object.assign({},state, {currentroom: action.currentroom});
        case 'ADD_USERNAME':
            return Object.assign({},state, {username: action.username});
        case 'ADD_MESSAGE':
            return Object.assign({},state, {message: action.message});
        case 'CHAT':
            return Object.assign({},state, {chat: action.chat});
        case 'SERVER':
            return Object.assign({},state, {server: action.server});
        case 'PRIVATE_MESSAGE':
            return Object.assign({},state, {privatemessage: action.privatemessage});
        case 'PRIVATE_MODAL':
            return Object.assign({},state, {showModal: action.showModal});
        case 'CONNECTED':
            return Object.assign({},state, {connected: action.connected});
        case 'CHATTING_WITH':
            return Object.assign({},state, {chatWithUser: action.chatWithUser});
        case 'FILE_UPLOAD':
            return Object.assign({},state, {file: action.file});
        
        }
    return state;
}

//  The below are required and map to the components dispatcher
const userReducer = (state={}, action) => {
  
    switch(action.type){
        case 'ADD_USERNAME':
            console.log("add usernamer", action.username);
            return Object.assign({},state, {username: action.username});
        case 'IS_LOGGED_IN':
          console.log("logged in", action.loggedin);
            return Object.assign({},state, {loggedin: action.loggedin});
        // case 'UPDATE_PROFILE':
        //     return Object.assign({}, state, {profile: action.profile});
        }
    return state;
}

const closetReducer = (state={}, action) => {
  
    switch(action.type){
        case 'UPDATE_CLOSET_PICKER':
            return Object.assign({},state, {updateClosetPicker: action.updateClosetPicker});
        case 'UPDATE_CLOSET_ITEMS':
            return Object.assign({},state, {updateClosetItems: action.updateClosetItems});
        case 'UPDATE_IMAGES':
            return Object.assign({},state, {images: action.images});
        case 'CLOSET_UPLOAD':
            return Object.assign({},state, {clothing: action.clothing});
        case 'TYPE_CHANGE':
            return Object.assign({},state, {itemtype: action.itemtype});
        case 'ITEM_CHANGE':
            return Object.assign({},state, {item: action.item});
        case 'CLOSET_ERROR':
        console.log("closeterror");
            return Object.assign({},state, {closeterror: action.closeterror});
        case 'INPUT_FILE':
         console.log("file");
            return Object.assign({},state, {file: action.file});
        case 'SUCCESSFUL_SAVE':
         console.log("imagesavedsuccess");
            return Object.assign({},state, {imagesavedsuccess: action.imagesavedsuccess});
        }
        
    return state;
}

const reducers = combineReducers({
    chatState : chatReducer,
    userState : userReducer,
    closetState: closetReducer,
})

var store = createStore(reducers);

export default store;


