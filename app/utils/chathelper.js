
import io from 'socket.io-client';
// for file uploads
import SocketIOFileUpload from 'socketio-file-upload';

var socketEndpoint = process.env.SOCKET_ENDPOINT;
var socket = io();

// Connect
var chathelper = {
        // handles initial connection
        handle_connection: (store, username) => {
            var reduxstore = store;
            socket.on('connect', () => {
                var connected = true;
                if (connected) {
                    reduxstore.dispatch({type: "CONNECTED", connected: true})
                }
            });
        
            socket.on('disconnect', () => {
                reduxstore.dispatch({type: "CONNECTED", connected: false})
            });
        },


        //Opens the Group Component and sets  the default Room
        startchat: (username, store) => {
            // for now its the same as add user - this area needs cleaning up once FB auth implemented
            var defaultRoom = "Group";
            socket.emit('connectuser', username, defaultRoom);
            // set default room to the current room
            store.dispatch({ 
              type: 'UPDATE_ROOM',
              currentroom: defaultRoom,  // default room
            })
        },
         //Opens the private chat Component and sets  the default Room
        startprvtchat: (username, store) => {
            // for now its the same as add user - this area needs cleaning up once FB auth implemented
            var defaultRoom = "Private";
            socket.emit('connectuser', username, defaultRoom);
            // set default room
            store.dispatch({ 
              type: 'UPDATE_ROOM',
              currentroom: defaultRoom,  // no default room
            })
            store.dispatch({ 
                type: 'CHATTING_WITH',
                chatWithUser: "",
            })
        },
        // this handles changes from one group room to another
        // chattype = Private or Group
        switchRoom: (newroom, chattype, store) => {

            socket.emit('switchRoom', newroom, chattype);
            // display current room -- need to get room for private chat

            if (chattype === "Private"){
                
                store.dispatch({ 
                type: 'UPDATE_ROOM',
                currentroom: "Private", //make this "Private" for private users
                })

                store.dispatch({ 
                    type: 'CHATTING_WITH',
                    chatWithUser: newroom,
                })
            } else {
                store.dispatch({ 
                    type: 'UPDATE_ROOM',
                    currentroom: newroom, //make this "Private" for private users
                })
            }
        
        },

        // sends group chat to server
        sendchat: (message, store) => {
            socket.emit('sendchat', message);
        },

        // sends group chat to server
        sendclosetpicker: (item, store) => {

            socket.emit('sendclosetpicker', item);

        },

         getIndexAndItem: (index, item) => {
              socket.emit('interactive_closet', item, index);
         },

        new_magazine_item_listener: (store) => {
            socket.on('newmagazine', function (data){

                store.dispatch({ 
                    type: 'NEW_MAGAZINES',
                    magazines: data
                })
            })
        },

        updateclothesbin: (store) => {
             socket.on('updateclothesbin', function (data){

                store.dispatch({ 
                    type: 'UPDATE_ITEM_ID',
                    itemid: data.item.id
                })

                store.dispatch({ 
                    type: 'UPDATE_ITEM_SRC',
                    itemsrc: data.item.src
                })
                store.dispatch({ 
                    type: 'UPDATE_INDEX',
                    index: data.index
                })
                store.dispatch({ 
                    type: 'UPDATE_ITEM',
                    items: data.item
                })
                
            })

        },


        updatechat_listener: (store) => {
            socket.on('updatechat', function (data){

                store.dispatch({ 
                    type: 'CHAT',
                    chat: data
                })
            })
        },
        // takes in the latest list of connected users
        connected_users: (store, component) => {
           socket.on('connectedusers', function (response){
              // update the redux store
              store.dispatch({ 
                  type: 'USER_LIST',
                  users: response
              })
            })

        },
        
        file_upload: (e, sourceType) => {
            if (sourceType === "upload"){
                var files = e.target.files || e.dataTransfer.files 
                if (files) {
                    //send only the first one
                    var file = files[0];
                    //read the file content and prepare to send it
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        //get all content
                        var buffer = e.target.result;          
                        //send the content via socket
                        socket.emit('send-file', file.name, buffer);
                    };

                    reader.readAsBinaryString(file);
                } 

            } else if (sourceType === "dnd"){
                 var url = e.dataTransfer.getData('text/plain-text');
                 socket.emit('send-url', url);
         
            }
 

        },
    
        img_upload: (image, userid, description, store) => {

                var tmpfilename = userid + "_New_Look";
                socket.emit('img-file', tmpfilename, userid, image, description);
                store.dispatch({ 
                        type: 'SAVING_MAGAZINE_IMG',
                        saving_magazine_img: true
                })
        
    },

    private_message: (store) => {

        socket.on('privatemessage', function (response){

            // update the redux store
            store.dispatch({ 
                type: 'PRIVATE_MESSAGE',
                privatemessage: response
            }),
            store.dispatch({ 
                type: 'PRIVATE_MODAL',
                showChatModal: true
            }), 
            store.dispatch({ 
                type: 'PRIVATE_CHAT_WAITING',
                privateChatWaiting: response
            })
            
        })
    }
}

export default chathelper;
