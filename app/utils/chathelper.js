// import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)
import io from 'socket.io-client';
// for file uploads
import SocketIOFileUpload from 'socketio-file-upload';

// const setDataSource = require('./datasource.js');

var socketEndpoint = process.env.SOCKET_ENDPOINT;
// var socket = io({
//     'forceNew': false,
//     'reconnect': false,
//     transports: ['websocket']
// });;
var socket = io();

// Connect
var chathelper = {
        // var self = this;

        handle_connection: (store, username) => {
            var reduxstore = store;
            socket.on('connect', () => {
                var connected = true;
                if (connected) {
                    reduxstore.dispatch({type: "CONNECTED", connected: true})
                }

                // socket.emit('adduser', username);
                // console.log("connected", username);
            });
        
            socket.on('disconnect', () => {
                reduxstore.dispatch({type: "CONNECTED", connected: false})
                // console.log("disconnected")
            });
        },

 
        adduser: (username, store) => {
        // this area needs cleaning up once FB auth implemented
            // var defaultRoom = "room1";
           
            // store.dispatch({ 
            //   type: 'UPDATE_ROOM',
            //   currentroom: defaultRoom,  // default room
            // })

        },

        // var chathelper = {

        //Opens the Group Component and sets  the default Room
        startchat: (username, store) => {
            // for now its the same as add user - this area needs cleaning up once FB auth implemented
            var defaultRoom = "room1";
            socket.emit('connectuser', username, defaultRoom);
            // set default room to the current room
            store.dispatch({ 
              type: 'UPDATE_ROOM',
              currentroom: defaultRoom,  // default room
            })
        },
         //Opens the Private Chat Component and has no default Room - the user must select a private chat
         // ***MAKE THESE DRY startchat and startprvtchat
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
            // for now reset this property when link is clicked ...maybe set to default room later
            // commented out 28 Mar
            // store.dispatch({ 
            //     type: 'CHATTING_WITH',
            //     chatWithUser: "",
            // })
        },
        // this handles changes from one group room to another
        // chattype = Private or Group
        switchRoom: (newroom, chattype, store) => {
            socket.emit('switchRoom', newroom, chattype);
            // display current room -- need to get room for private chat
            // if (chattype = "Group"){
                // console.log(newroom, "newroom", "chattype", chattype);
                
           
            // console.log("chatwaiting", newroom, "newroom")
             

            if (chattype === "Private"){
                
                store.dispatch({ 
                type: 'UPDATE_ROOM',
                currentroom: "Private", //make this "Private" for private users
                })
                // console.log("is ths chat with user beign fired", newroom);
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
            // console.log("message received", message)
            socket.emit('sendchat', message);
        },

                // sends group chat to server
        sendclosetpicker: (item, store) => {
            // console.log("message received", message)
            socket.emit('sendclosetpicker', item);

        },

         getIndexAndItem: (index, item) => {

              socket.emit('interactive_closet', item, index);


         },

        // // sends private chat to server
        // sendprvtchat: function(chatuser, message, store){
        //     socket.emit('sendprvtchat', chatuser, message);
        // },

// Listeners Section -- these wait for incoming data from the server and the data received triggers actions on the  dom - state changes
        // takes in the latest chat data 

        // updatecloset_listener(updateClosetPicker){
        //     socket.on('updatecloset', function (data){

        //         // console.log("is the data in here", data)
        //         store.dispatch({ 
        //             type: 'UPDATE_CLOSET_ITEMS',
        //             closetitems: data  // closet image data sent for updating 
        //         })
        //     })

        // },
       new_magazine_item_listener: (store) => {
            socket.on('newmagazine', function (data){
                // console.log("is the data in here", data)
                // console.log("magazines", data);

                store.dispatch({ 
                    type: 'NEW_MAGAZINES',
                    magazines: data
                })
            })
        },

        updateclothesbin: (store) => {
             socket.on('updateclothesbin', function (data){
                // console.log("is the closthes bin in here", data.item, data.index);
                // console.log("store Obj in clothesbin", store.getState());
                console.log("Data", data);
                store.dispatch({ 
                    type: 'UPDATE_ITEM_ID',
                    itemid: data.item.id
                })
                store.dispatch({ 
                    type: 'UPDATE_ITEM',
                    items: data.item
                })
                store.dispatch({ 
                    type: 'UPDATE_ITEM_SRC',
                    itemsrc: data.item.src
                })
                store.dispatch({ 
                    type: 'UPDATE_INDEX',
                    index: data.index
                })
                console.log("store Obj after dispatch clothesbin", store.getState());
                
            })

        },


        updatechat_listener: (store) => {
            socket.on('updatechat', function (data){
                // console.log("is the data in here", data)
                store.dispatch({ 
                    type: 'CHAT',
                    chat: data
                })
            })
        },
        // takes in the latest list of connected users
        connected_users: (store, component) => {
           socket.on('connectedusers', function (response){
            //   console.log("in connectedusers", component, response)
              // update the redux store
              store.dispatch({ 
                  type: 'USER_LIST',
                  users: response
              })
            })

        },

        // not currently working!!!
        // service messages from server - including requests for private chat
        server_messages: (store) => {

           socket.on('servermessage', function (response){
   //           console.log("in connectedusers", response)
              // update the redux store
              store.dispatch({ 
                  type: 'SERVER',
                  server: response
              })
            })
        },
        
        file_upload: (e, sourceType) => {
            // sourceType ="upload" or "dnd"
            
           
        //    console.log(url);
            if (sourceType === "upload"){
                var files = e.target.files || e.dataTransfer.files 
                if (files) {
                    //send only the first one
                    var file = files[0];
                    //read the file content and prepare to send it
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        console.log('Sending file...');
                        //get all content
                        var buffer = e.target.result;
                    
                        //send the content via socket
                        socket.emit('send-file', file.name, buffer);
                    };
                    //  reader.readAsDataURL(file);
                    reader.readAsBinaryString(file);
                } 

            } else if (sourceType === "dnd"){
                 var url = e.dataTransfer.getData('text/plain-text');
                 
                //  console.log(url, "url");
 
                // if (url !== ""){
                     socket.emit('send-url', url);
                // }
            }
 

        },
    
        img_upload: (image, userid) => {
        // sourceType ="upload" or "dnd"
        
            // if (image) {
            //         var reader = new FileReader();
            //         reader.onload = function(e) {
            //             console.log('Sending file...');
            //             //get all content
            //             var buffer = e.target.result;
                    
            //             //send the content via socket
            //             // socket.emit('send-file', "TEST", buffer);
                        var tmpfilename = userid + "_New_Look";
                        socket.emit('img-file', tmpfilename, userid, image);
            //         };
            //         // send the content via socket
             
                
        
                    
            //     };s
            //     //  reader.readAsDataURL(file);
            //     reader.readAsDataURL(image);
    },




        private_message: (store) => {

           socket.on('privatemessage', function (response){
                console.log("getting privaet message")
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
              console.log("show modal after message rec", store.getState())
            })
        }
    }

export default chathelper;
