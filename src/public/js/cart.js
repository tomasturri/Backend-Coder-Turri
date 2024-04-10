const buyBottom = document.querySelector('.buy-button');
const idElement = document.querySelector('.card--id');

const url = 'http://localhost:8080/api/carts';
let config;

buyBottom.addEventListener('click', (event) => {
    const productId = idElement.innerText.split(':')[1].trim();
    event.preventDefault();
    addProductToCart(productId);
});
const addProductToCart = (productId) => {
    // obtenemos cartId del usuario
    const cartId = Cookies.get('cart');
    // construimos el body de la peticion
    const body = {
        quantity: 1,
    };
    const configFetch = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    console.log(`${url}/${cartId}/products/${productId}`);
    fetch(`${url}/${cartId}/products/${productId}`, configFetch)
        .then((response) => response.json())
        .then((data) => {
            Toastify({
                text: data.message,
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                backgroundColor: '#000',
                textColor: '#fff',
            }).showToast();
        })
        .catch((error) => {
            Toastify({
                text: error.message,
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                backgroundColor: 'red',
                textColor: '#fff',
            });
        });
};