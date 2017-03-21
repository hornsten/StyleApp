// import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)
import io from 'socket.io-client';

// const setDataSource = require('./datasource.js');
var socket = io();


  var chathelper = {
        //Opens the Group Component and sets  the default Room
        startchat: function(username, store){
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
        startprvtchat: function(username, store){
            // for now its the same as add user - this area needs cleaning up once FB auth implemented
            var defaultRoom = "Private";
            socket.emit('connectuser', username, defaultRoom);
            // set default room
            store.dispatch({ 
              type: 'UPDATE_ROOM',
              currentroom: defaultRoom,  // no default room
            })
        },
        // this handles changes from one group room to another
        // chattype = Private or Group
        switchRoom: function(newroom, chattype, store){
            socket.emit('switchRoom', newroom, chattype);
            // display current room -- need to get room for private chat
            if (chattype = "Group"){
                store.dispatch({ 
                type: 'UPDATE_ROOM',
                currentroom: newroom,
                })
            } else  if (chattype = "Private"){
                store.dispatch({ 
                    type: 'UPDATE_ROOM',
                    currentroom: "Private Chat",
                })
            }
        
        },
        // this handles changes from private chat room to another
        // privateChat: function(chatuser, store){
        //     socket.emit('switchPrivateRoom', chatuser);
        //     store.dispatch({ 
        //       type: 'UPDATE_ROOM',
        //       currentroom: chatuser,
        //     })
        // },
        // adds user - maybe do on component will mount wiht FB auth
        adduser: function(username, store){
        // this area needs cleaning up once FB auth implemented
            // var defaultRoom = "room1";
            socket.emit('adduser', username);
            // store.dispatch({ 
            //   type: 'UPDATE_ROOM',
            //   currentroom: defaultRoom,  // default room
            // })

        },
        // sends group chat to server
        sendchat: function(message, store){
            console.log("message received", message)
            socket.emit('sendchat', message);
        },
        // // sends private chat to server
        // sendprvtchat: function(chatuser, message, store){
        //     socket.emit('sendprvtchat', chatuser, message);
        // },

// Listeners Section -- these wait for incoming data from the server and the data received triggers actions on the  dom - state changes
        // takes in the latest chat data 
        updatechat_listener: function(store){
            socket.on('updatechat', function (data){
                console.log("is the data in here", data)
                store.dispatch({ 
                    type: 'CHAT',
                    chat: data
                })
            })
        },
        // takes in the latest list of connected users
        connected_users: function(store){
           socket.on('connectedusers', function (response){
              console.log("in connectedusers", response)
              // update the redux store
              store.dispatch({ 
                  type: 'USER_LIST',
                  users: response
              })
            })

        },

        // not currently working!!!
        // service messages from server - including requests for private chat
        server_messages: function(store){

           socket.on('servermessage', function (response){
              console.log("in connectedusers", response)
              // update the redux store
              store.dispatch({ 
                  type: 'SERVER',
                  server: response
              })
            })
        },
    }

export default chathelper;
