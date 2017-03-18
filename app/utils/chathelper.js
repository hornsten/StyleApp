import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)
var socket = io.connect();


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
    updatechat_listener: function(){
        socket.on('updatechat', function (username, data){
        console.log("in here??", username, data);
            return [username, data];
        });
    }

}

export default chathelper;