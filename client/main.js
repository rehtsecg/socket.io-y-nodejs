
var socket = io.connect('http://localhost:6677', {'forceNew': true});

socket.on('messages', function(data) {
    console.log(data);
    render(data);
    
});

 
function render(data) {
    var html = data.map(function (message, index) {
        return `
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `;
    }).join('');

    var container = document.getElementById('messages');
    if (container) {
 
        container.innerHTML = html;
        container.scrollTop = container.scrollHeight;
    } else {
        console.error('No se encontró el contenedor con id "messages".');
    }
}

function addMessage(e) {    
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}


    
