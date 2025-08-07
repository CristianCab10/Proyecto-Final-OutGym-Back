require("./db/config.db");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(morgan("dev"));

//rutas
app.use("/productos", require("./routes/productos.routes"));
app.use("/usuarios", require("./routes/usuarios.routes"));
app.use("/carritos", require("./routes/carritos.routes"));

app.listen(3001, () => {
  console.log("Servidor andando en el puerto", 3001);
});
