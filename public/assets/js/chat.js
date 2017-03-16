// adapted from http://psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/

	var socket = io.connect();

	// on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
        // leave here until we have auth.
		// detfault room
		socket.emit('adduser', prompt("What's your name?"));
	});

	// listener, whenever the server emits 'updatechat', this updates the chat body
	socket.on('updatechat', function (username, data) {
		$('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
	});

// detfault room
	// listener, whenever the server emits 'updaterooms', this updates the room the client is in
	socket.on('updaterooms', function(rooms, current_room) {
		$('#rooms').empty();
		$.each(rooms, function(key, value) {
			if(value == current_room){
				$('#rooms').append('<div>' + value + '</div>');
                $('#current-room').append('<div>' + value + '</div>');
			}
			else {
                console.log('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
				$('#rooms').append('<div><a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>');
			}
		});
	});

    // $('#addfile').on('submit', function(e){
    //    console.log("in here");
    //     // var data = e.originalEvent.target.files[0];
    //     data = $('#uploadfile').val();
    //     console.log(data);
    //     readThenSendFile(data);     
    //     e.preventDefault(); 
    // });

    // $("#uploadfile").on('change',function(e){
    
    //    console.log("in here",  $("#uploadfile").val());
    //     // // var data = e.originalEvent.target.files[0];
    //     // data = $('#uploadfile').val();
    //     // console.log(data);

    //     // readThenSendFile(data); 
    //     socket.emit('base64 file', $("#uploadfile").val());    
    //     e.preventDefault(); 

    // });

    // function readThenSendFile(data){

    //         var msg ={};
    //         // msg.username = username;
    //         msg.file = evt.target.result;
    //         msg.fileName = data.name;
    //         console.log(msg);
    //         socket.emit('base64 file', msg);

    // }

	function switchRoom(room){
		socket.emit('switchRoom', room);
	}

    function privateRoom(chatuser){
		socket.emit('privateRoom',chatuser);
	}
 

	// on load of page
	$(function(){
		// when the client clicks SEND
		$('#datasend').click( function() {
			var message = $('#data').val();
			$('#data').val('');
			// tell server to execute 'sendchat' and send along one parameter
			socket.emit('sendchat', message);
		});

		// when the client hits ENTER on their keyboard
		$('#data').keypress(function(e) {
			if(e.which == 13) {
				$(this).blur();
				$('#datasend').focus().click();
			}
		});
	});

    $(document).ready( function(){
        //get users names and display
        $('#users').html();
        console.log("currentRoom", $('#current-room').val());
        // hardcoded "room1"
        $('#users').append('<ul>');
        $.get('/chat/user/room1', function(data){
            // console.log(data);
            for (var i = 0; i < data.length; i++){
                console.log('<li><a href="#" onclick="privateRoom(\''+data[i].username+'\')"">'+data[i].username+'</a></li>');
                $('#users').append('<li><a href="#" onclick="privateRoom(\''+data[i].username+'\')">'+data[i].username+'</a></li>');
            
            }
        })
        $('#users').append('</ul>');
    })


