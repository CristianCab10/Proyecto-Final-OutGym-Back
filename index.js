const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.use("/usuarios", require("./routes/usuarios.routes"))

app.listen(3001,() => {
    console.log("Servidor andando en el puerto", 3001)
})