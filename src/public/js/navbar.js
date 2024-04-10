//----- navbar----
const nav = document.querySelector('#nav');
const open = document.querySelector('.open-menu');
const close = document.querySelector('.close-menu');
console.log(open);
open.addEventListener('click', () => {
    nav.classList.add('visible');
    nav.classList.add('animate__animated');
    nav.classList.add('animate__fadeInRight');
});
close.addEventListener('click', () => {
    nav.classList.remove('visible');
    nav.classList.remove('animate__animated');
    nav.classList.remove('animate__fadeInRight');
});

const cartId = Cookies.get('cart');
const cartLink = document.querySelector('.btn-cart');
if (cartId) {
    cartLink.href = `http://localhost:8080/carts/${cartId}`;
}
//-----navbar----