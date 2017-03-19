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
            // display back chat history - 20 lines?


        },
  
        
        adduser: function(username){
            socket.emit('adduser', username);

        },
        
        sendchat: function(message){
            socket.emit('sendchat', message);
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
            socket.on('updatechat', function (username, data){
                var chat = {username: username, message: data }
                console.log(chat, "chat in helper");
                store.dispatch({ 
                    type: 'CHAT',
                    chat: chat
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
    
        chat_history: function(store){

        }
        

    }

export default chathelper;
