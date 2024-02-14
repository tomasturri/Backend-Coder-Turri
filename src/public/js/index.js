@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");
/* navbar */

/* url paleta de colores: https://colorhunt.co/palette/0306373c0753720455910a67*/


:root {
  --primary-color: #030637;
  --secondary-color: #3C0753;
  --dark-purple: #720455;
  --deep-magenta: #910A67;
  --background-color:#1F2544;
}


body {
  color: #4c4b5b;
  font-family: "Euclid Circular A", "Poppins";
  padding-top: 72px;
  background-color: #1B262C;
}

* {
  box-sizing: border-box;
}

button,
a {
  cursor: pointer;
  transition: 0.3s;
  color: inherit;
  font-weight: 600;
}


nav {
  position: fixed;
  top: 0;
  left:0;
  translate: 0 -72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 20px;
  width: 100%;
  height: 72px;
  background: var(--primary-color);
  transition: 0.3s;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 16px;
}

.nav-items > a {
  text-decoration: none;
  color: rgb(255 255 255 / 96%);
  height: 72px;
  display: grid;
  place-items: center;
}

.nav-items > a:hover {
  color: rgb(255 255 255 / 96%);
}
a.nav-item:hover {
  color:  var(--deep-magenta);
}

.open-menu, .close-menu{
  display: none;
}


@media screen and (max-width: 550px) {
  .open-menu, .close-menu {
    display: block;
  }
  .nav-items {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    display: flex;
    flex-direction: column;
    top:0;
    right: 0;
    height: 300px;
    align-items: end;
    background-color: var(--primary-color);
    padding: 2rem;
    box-shadow: 0 0 0 100vh rgba(0,0,0,.5);
  }

  .visible {
    opacity: 1;
    visibility: visible;
  }

}

/* navbar */

/* /products */
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-item {
  width: 300px; /* Ajusta el ancho según tus necesidades */
  margin: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.product-item:hover {
  transform: scale(1.05);
}

.product-item h2 {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.product-item p {
  margin: 8px 0;
}

.navigate-button {
  border-radius: 5px;
  padding: 5px;
  background-color: var(--dark-purple);
  color: #fff;
  text-decoration: none;
}

.navigate-button:hover {
  background-color: var(--primary-color);
}

.buy-button {
  background-color: var(--dark-purple);
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.buy-button:hover {
  background-color: var(--primary-color);
}

/* /products */


.container {
  display: flex;
  flex-direction: column;
}

.bi.bi-chat {
  font-size: 24px; 
}

.chat-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.title {
  margin-left: 10px; 
}

/* detalles de producto */
.product-details {
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}


.cart--title {
  font-size: 24px;
  margin-bottom: 10px;
}

.card--description {
  font-size: 16px;
  margin-bottom: 10px;
}

.card--price {
  font-size: 20px;
  margin-bottom: 20px;
}

.card-code {
  margin-bottom: 5px;
}

.card-stock {
  margin-bottom: 5px;
}

.card-category {
  margin-bottom: 5px;
}

.thumbnail-container {
  display: flex;
  flex-direction: column;
}

.main-thumbnail {
  width: 300px; /* Ajusta el ancho de la imagen principal según tus necesidades */
  height: auto; /* Mantén la proporción de aspecto original */
  margin-bottom: 10px;
}

.main-thumbnail:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.secondary-thumbnails {
  display: flex;
}

.thumbnail {
  width: 100px; /* Ajusta el ancho de las imágenes secundarias según tus necesidades */
  height: auto; /* Mantén la proporción de aspecto original */
  margin-right: 10px;
}

.thumbnail:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.product-info {
  margin-left: 20px;
}


/* detalles de producto */