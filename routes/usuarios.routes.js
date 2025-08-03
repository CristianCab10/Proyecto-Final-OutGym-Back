const { Router } = require("express")
const { obtenerTodosLosUsuarios, obtenerUsuarioPorId, crearNuevoUsuario, iniciarSesion, recuperarPassUser, cambioPassUserToken } = require("../controllers/usuario.controllers")
const authMiddleware = require("../middlewares/auth.middleware")
const router = Router()
const { check } = require("express-validator")

router.get("/", obtenerTodosLosUsuarios)
router.get("/:id", [
    check("id","ERROR. El formado de ID no corresponde a MongoDB").isMongoId()
], obtenerUsuarioPorId)

router.post("/", [
    check("nombreUsuario", "Campo NOMBRE vacio").notEmpty(),
    check("nombreUsuario", "El nombre de usuario debe tener un mínimo de 5 caracteres").isLength( { min:5 }, { max:10 } ),
    check("emailUsuario", "Formato incorrecto").isEmail(),
    check("password", "ERROR, debe tener un mínimo de 8 caracteres").isLength( { min:8 } )
], crearNuevoUsuario)
router.post("/login", iniciarSesion)
router.post("/recoveryPass", recuperarPassUser)
router.post("/changeNewPassUser", cambioPassUserToken)

module.exports = router