const express = require('express');
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", productsRouter);
app.use("/api", cartsRouter);


app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación!');
});

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en http://localhost:${PORT}`);
});