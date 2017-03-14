$(function () {
    var socket = io();
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });


    socket.on("update", function(msg) {
        $("#msgs").append("" + msg + "");
    });


    $('.privMsg').submit(function(){
        // var name = $('#name').val();
        var obj = {
        to: "Mary",
        from: $('#name').val(),
        message: "this is a test"
    }
        socket.emit("privatejoin", $('#name').val());
        return false;
    });
    
    $('.addName').submit(function(){
        // var name = $('#name').val();
        socket.emit("join", $('#name').val());
        return false;
    });

    
});
