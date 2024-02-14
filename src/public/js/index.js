
const socket = io();

// note creamos una variable para guardar el usuario
let user;

const chatBox = document.getElementById('chatBox');
const sendButton = document.getElementById('button-send');

function sendMessage() {
  if (chatBox.value.trim().length > 0) {
    socket.emit('message', { user: user, message: chatBox.value });
  }
  chatBox.value = '';
}


// note sweet alert 2

Swal.fire({
  title: 'Identificate',
  input: 'text',
  text: 'Ingresa un usuario para identificarte en el chat',
  inputValidator: (value) => {
    return !value && 'Necesitas escribir un nombre para continuar';
  },
  allowOutsideClick: false,
}).then((result) => (user = result.value));

chatBox.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    sendMessage(); 
  }
});

sendButton.addEventListener('click',()=>{
  sendMessage();
});

socket.on('messagesLogs', (data) => {
  let log = document.getElementById('messagesLogs');
  let messages = '';

  data.forEach((message) => {
    const messageClass = message.user === user ? 'user-message' : '';
    messages += `<div class="chat-message ${messageClass}">
                    <span class="message-user">${message.user}</span>
                    <span>${message.message}</span>
                 </div>`;
  });

  log.innerHTML = messages;
  log.scrollTop = log.scrollHeight;
});