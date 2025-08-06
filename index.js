require("./db/config.db")
const express = require("express")
const app = express()
const cors = require("cors")
const bookingsRoutes = require('./routes/bookings');
const mongoose = require('mongoose');
require('dotenv').config();

app.use(express.json())
app.use(cors())

app.use("/usuarios", require("./routes/usuarios.routes"))
app.use("/carritos", require("./routes/carritos.routes"))
app.use('/bookings', bookingsRoutes);

mongoose.connect(process.env.MONGO_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Mongo conectado');
  app.listen(3001, () => console.log('Servidor corriendo en http://localhost:3001'));
})
.catch(err => console.error('Error al conectar MongoDB:', err));