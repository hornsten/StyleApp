// import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)
import io from 'socket.io-client';

// const setDataSource = require('./datasource.js');
var socket = io();


  var chathelper = {

        
        
        switchRoom: function(newroom, store){
            socket.emit('switchRoom', newroom);
            // display current room
            store.dispatch({ 
              type: 'UPDATE_ROOM',
              currentroom: newroom,
            })
           


        },

        
  
        
        adduser: function(username, store){
        // for now its the same as start chat - this area needs cleaning up once FB auth implemented
            // socket.emit('adduser', username);

            store.dispatch({ 
              type: 'UPDATE_ROOM',
              currentroom: 'room1',  // default room
            })

        },

        startchat: function(username, store){
          // for now its the same as add user - this area needs cleaning up once FB auth implemented
            socket.emit('adduser', username);
            // set default room
            store.dispatch({ 
              type: 'UPDATE_ROOM',
              currentroom: 'room1',  // default room
            })

        },
        
        sendchat: function(message, store){
            socket.emit('sendchat', message);
        },

        sendprvtchat: function(chatuser, message, store){
            socket.emit('sendprvtchat', chatuser, message);
        },

        privateChat: function(chatuser, store){
            socket.emit('privatechat', chatuser);
            store.dispatch({ 
              type: 'UPDATE_ROOM',
              currentroom: chatuser,
            })
           
        },
        // listen for data from the server
        // ####### Stopped here
        // not gettgin the datea out into the react component
        // make this function a promise or the whole thing one????

                // socket.on('updatechat', (username, data) => {   
            //      console.log("socket", username, data);
            //     this.updatechat(username, data);
        //     // })

        // pass in the dispatch
        updatechat_listener: function(store){
            socket.on('updatechat', function (data){
                // var chat = {username: username, message: data }
                // console.log(chat, "chat in helper");
                store.dispatch({ 
                    type: 'CHAT',
                    chat: data
                })
                // return [username, data];
            })
        },
            
        connected_users: function(store){

           socket.on('connectedusers', function (response){
              console.log("in connectedusers", response)
              // update the redux store
              store.dispatch({ 
                  type: 'USER_LIST',
                  users: response
              })
      
                // return [username, data];
            })

        },

        // service messages from server - including requests for private chat
        server_messages: function(store){

           socket.on('servermessages', function (response){
              console.log("in connectedusers", response)
              // update the redux store
              store.dispatch({ 
                  type: 'SERVER',
                  server: response
              })
      
                // return [username, data];
            })

        },
        // chat_history: function(store){

        //    socket.on('connectedusers', function (response){
        //       console.log("in connectedusers", response)
        //       // update the redux store
        //       store.dispatch({ 
        //           type: 'USER_LIST',
        //           users: response
        //       })
      
        //         // return [username, data];
        //     })


        // }
        

    }

export default chathelper;
