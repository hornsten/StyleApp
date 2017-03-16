// $(function () {
//     var socket = io();
//     // submit for for general chat channel
//     // COMMENTED OUT BUT WORKS
//     $('form').submit(function(){
//         socket.emit('chat message', $('#m').val());
//         $('#m').val('');
//         return false;
//     });

//     // general chat channel for all users 
//     socket.on('chat message', function(msg){
//         $('#messages').append($('<li>').text(msg));
//     });

    
//     $('.addName').submit(function(){
//         // var name = $('#name').val();
//         console.log( "name:", $('#name').val());
//         socket.emit("join", $('#name').val());
       
//         return false;
//     });




    // ******* BELOW WORK IN PROGRESS




    
});
