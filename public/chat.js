window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var username = "";
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data.message);
            var html = '';
            for(var i=0; i<messages.length; i++) {
		html += ' <b>'+data.name + '</b><br />';
                html += messages[i] + '<br />';

            }
            content.innerHTML = html;
	    content.scrollTop = content.scrollHeight;
	    field.value = "";

        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
	if(username === ""){
		username = prompt('Type your nick name');
		
	}else{
	        var text = field.value;
        	socket.emit('send', { message: text, name: username });
	}
    };
 
}
