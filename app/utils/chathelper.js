// import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)
import io from 'socket.io-client';

// const setDataSource = require('./datasource.js');
var socket = io();


  var chathelper = {
        
        switchRoom: function(newroom){
            socket.emit('switchRoom', newroom);
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
                console.log(data, "data");
                store.dispatch({ 
                    type: 'CHAT_USER',
                    chatuser: username
                },
                { 
                    type: 'CHAT_MSG',
                    chatmsg: data
                })
               
                // return [username, data];
            });
        }
        

    }

export default chathelper;
