const socket = io();

const productContainer = document.getElementById('product__container');

socket.on('products', (data) => {
    renderProducts(data);
});

const renderProducts = (data) => {
    data.products.forEach((product) => {
        const card = document.createElement('div');
        card.classList.add('product-item');
        card.innerHTML = `

        <h3 class='product__title'>Titulo : ${product.title}</h3>
        <p class='product__description'>Descripción : ${product.description}</p>
        <p class='product__price-text'>Precio: <span class='product__price-number'>${product.price}</span></p>
        <button class='btn-delete-product' data-id='${product._id}'>Eliminar</button>
        <button class='btn-update-product' data-id='${product._id}'>Actualizar</button>
        `;
        card.querySelector('.btn-delete-product').addEventListener(
            'click',
            () => {
                deleteProduct(product._id);
            }
        );
        card.querySelector('.btn-update-product').addEventListener(
            'click',
            () => {
                updateProduct(product._id);
            }
        );
        productContainer.appendChild(card);
    });
};

const deleteProduct = (id) => {
    socket.emit('deleteProduct', id);
};

const updateProduct = (id) => {
    const title = document.getElementById('form-title').value;
    const stringStatus = document.getElementById('form-select').value;
    const status = JSON.parse(stringStatus.toLowerCase());
    const category = document.getElementById('form-category').value;
    const description = document.getElementById('form-description').value;
    const price = parseFloat(document.getElementById('form-price').value);
    const code = document.getElementById('form-code').value;
    const stock = parseInt(document.getElementById('form-stock').value);
    if (
        title &&
        status !== undefined &&
        category &&
        description &&
        price &&
        code &&
        stock !== undefined
    ) {
        const product = {
            title,
            status,
            category,
            description,
            price,
            code,
            stock,
        };
        const request = {
            id,
            product,
        };
        socket.emit('updateProduct', request);
    } else {
        console.error('Algunos campos del formulario no están definidos.');
    }
};

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    addProduct();
});

const addProduct = () => {
    const title = document.getElementById('form-title').value;
    const stringStatus = document.getElementById('form-select').value;
    const status = JSON.parse(stringStatus.toLowerCase());
    const category = document.getElementById('form-category').value;
    const description = document.getElementById('form-description').value;
    const price = parseFloat(document.getElementById('form-price').value);
    const code = document.getElementById('form-code').value;
    const stock = parseInt(document.getElementById('form-stock').value);

    if (
        title &&
        status !== undefined &&
        category &&
        description &&
        price &&
        code &&
        stock !== undefined
    ) {
        const product = {
            title,
            status,
            category,
            description,
            price,
            code,
            stock,
        };

        socket.emit('addProduct', product);
    } else {
        console.error('Algunos campos del formulario no están definidos.');
    }
};

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

sendButton.addEventListener('click', () => {
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