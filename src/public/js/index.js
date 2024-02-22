const socket = io();

const productContainer = document.getElementById('product__container');
socket.on('products', (data) => {
  console.log(data);
  let products = '';
  data.products.forEach((product) => {
    products =
      products +
      `
      <div class='product-item'>
        <h3 class='product__title'>Titulo : ${product.title}</h3>
        <p class='product__description'>Descripción : ${product.description}</p>
        <p class='product__price-text'>Precio: <span class='product__price-number'>${product.price}</span></p>
      </div>
    `;
  });

  //Agregamos un evento eliminar a cada button
  productContainer.innerHTML = products;
  // const deleteButtons = document.querySelectorAll('.delete-button');
  // deleteButtons.forEach((button, index) => {
  //   button.addEventListener('click', () => {
  //     deleteProduct(data[index].id);
  //   });
  // });
  //Agregamos un evento al button de enviar el formulario
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    addProduct();
  });
});

// const deleteProduct = (id) => {
//   socket.emit('deleteProduct', id);
// };

const addProduct = () => {
  const title = document.getElementById('form-title').value;
  const stringStatus = document.getElementById('form-select').value;
  const status = JSON.parse(stringStatus.toLowerCase());
  const category = document.getElementById('form-category').value;
  const description = document.getElementById('form-description').value;
  const price = parseFloat(document.getElementById('form-price').value);
  const code = document.getElementById('form-code').value;
  const stock = parseInt(document.getElementById('form-stock').value);

  // verificamos si todos los campos están presentes
  if (
    title &&
    status !== undefined &&
    category &&
    description &&
    price &&
    code &&
    stock !== undefined
  ) {
    // creamos objeto con los datos del formulario
    const product = {
      title,
      status,
      category,
      description,
      price,
      code,
      stock,
    };

    // enviamos el producto a través del socket
    socket.emit('addProduct', product);
  } else {
    console.error('Algunos campos del formulario no están definidos.');
  }
};



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