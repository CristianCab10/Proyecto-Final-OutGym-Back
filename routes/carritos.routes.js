const { Router } = require("express")
const { agregarProductosCarrito, obtenerTodosLosProductosDelCarrito, eliminarProductoCarritoId, pagarCarritoMp } = require("../controllers/carritos.controllers")
const authMiddleware = require("../middlewares/auth.middleware")
const router = Router()

router.get("/", authMiddleware("usuario"), obtenerTodosLosProductosDelCarrito)

router.put("/agregarProducto/:idProducto", authMiddleware("usuario"), agregarProductosCarrito)
router.put("/eliminarProducto/:idProducto", authMiddleware("usuario"), eliminarProductoCarritoId)

router.post ("/pagarCarritoMp" , pagarCarritoMp)


module.exports = router