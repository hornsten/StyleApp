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
        case 'TEST':
            console.log("TEST");
            return Object.assign({},state, {test: action.test})
        case 'ADD_USERID':
            console.log("ADD_USERID");
            return Object.assign({},state, {userid: action.userid})
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
            return Object.assign({},state, {showChatModal: action.showChatModal});
        case 'PRIVATE_CHAT_WAITING':
            return Object.assign({},state, {privateChatWaiting: action.privateChatWaiting})
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
            return Object.assign({},state, {username: action.username});
        case 'IS_LOGGED_IN':
            return Object.assign({},state, {loggedin: action.loggedin});
        case 'UPDATE_PROFILEIMAGE':
            return Object.assign({}, state, {profile_image: action.profile_image});
        case 'UPDATE_STYLEMOTTO' :
            return Object.assign({}, state, {stylemotto: action.stylemotto});
        case 'UPDATE_BLURB':
            return Object.assign({},state, {blurb: action.blurb});
        case 'UPDATE_INSPIRATION' :
            return Object.assign({}, state, {inspiration: action.inspiration});
        case 'UPDATE_DESIGNER':
            return Object.assign({},state, {designer: action.designer});
      
        }
    return state;
}

const mainReducer = (state={}, action) => {
switch(action.type) {
    case 'ALL_MAGAZINES':
        return Object.assign({},state, {allmagazines: action.allmagazines});
    case 'ADD_SEARCH':
        return Object.assign({},state, {search: action.search});
    case 'ADD_SEARCH_USERID':
        return Object.assign({},state, {searchUserid: action.searchUserid});
     case 'PROFILE_MODAL':     
            return Object.assign({},state, {profileModal: action.profileModal});
    case 'UPDATE_PROFILE_NAME':
        return Object.assign({},state, {profileusername: action.profileusername});
    case 'UPDATE_PROFILE_ID':
        return Object.assign({},state, {profileuserid: action.profileuserid});
    case 'NEW_PROFILE_MAGAZINES':
        return Object.assign({},state, {profilemagazines: action.profilemagazines});
    case 'SINGLE_IMAGE_MODAL':
        return Object.assign({},state, {singleImageModal: action.singleImageModal});

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
        case 'CLOSET_TOP':
            return Object.assign({},state, {top: action.top});
        case 'CLOSET_BOTTOM':
            return Object.assign({},state, {bottom: action.bottom});
        case 'CLOSET_SHOES':
            return Object.assign({},state, {shoes: action.shoes});
        case 'CLOSET_BAG':
            return Object.assign({},state, {bag: action.bag});
        case 'CLOSET_ACCESSORY':
            return Object.assign({},state, {accessory: action.accessory});
        case 'CLOSET_DRESS':
            return Object.assign({},state, {dress: action.dress});
        case 'CLOSET_FLAIR':
            return Object.assign({},state, {flair: action.flair});
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
        case 'NEW_MAGAZINES':
            return Object.assign({},state, {magazines: action.magazines});
        case 'ADD_DESCRIPTION':
            return Object.assign({},state, {description: action.description});
        case 'SAVING_MAGAZINE_IMG':
            return Object.assign({},state, {saving_magazine_img: action.saving_magazine_img});
            return Object.assign({},state, {items: action.items});
        case 'UPDATE_INDEX':
            console.log("UPDATE_INDEX");
            return Object.assign({},state, {index: action.index});
        case 'UPDATE_ITEM_ID':
            console.log("UPDATE_ITEM_ID");
            return Object.assign({},state, {itemid: action.itemid});
        case 'UPDATE_ITEM_SRC':
            console.log("UPDATE_ITEM_SRC");
            return Object.assign({},state, {itemsrc: action.itemsrc});
        case 'UPDATE_ITEM':
            console.log("UPDATE_ITEM");
            return Object.assign({},state, {items: action.items});
            
        }
        
    return state;
}


// const interactiveClosetReducer = (state={}, action) => { 
//     switch(action.type){
//         case 'UPDATE_INDEX':
//             console.log("UPDATE_INDEX");
//             return Object.assign({},state, {interactiveindex: action.interactiveindex});
//         case 'UPDATE_ITEM':
//             console.log("UPDATE_ITEM");
//             return Object.assign({},state, {interactiveitem: action.interactiveitem});
//         }
        
//     return state;
// }


const reducers = combineReducers({
    chatState : chatReducer,
    userState : userReducer,
    closetState: closetReducer,
    mainState: mainReducer,
})

var store = createStore(reducers);

export default store;
