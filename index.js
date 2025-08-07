require("./db/config.db");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const bookingsRoutes = require('./routes/bookings');
const mongoose = require('mongoose');
require('dotenv').config();
const productosRoutes = require("./routes/productos.routes");

//middlewares


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "public")));
/* app.use(cors()); */
app.use(cors({
  origin: 'https://proyecto-final-out-gym-front-snowy.vercel.app',
  credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan("dev"));

app.use("/usuarios", require("./routes/usuarios.routes"))
app.use("/carritos", require("./routes/carritos.routes"))
app.use('/bookings', bookingsRoutes);
app.use("/uploads", express.static("uploads"));


/* mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Mongo conectado');
  app.listen(3001, () => console.log('Servidor corriendo en http://localhost:3001'));
})
.catch(err => console.error('Error al conectar MongoDB:', err)); */
app.use("/api/carrito", require("./routes/carritos.routes"));
app.use("/api/productos", require("./routes/productos.routes"));

