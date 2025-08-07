const { Router } = require("express")
const { 
  obtenerTodosLosUsuarios, 
  obtenerUsuarioPorId, 
  crearNuevoUsuario, 
  iniciarSesion, 
  recuperarPassUser, 
  cambioPassUserToken,
  actualizarUsuario,
  eliminarUsuario
} = require("../controllers/usuario.controllers")
const authMiddleware = require("../middlewares/auth.middleware")
const { check } = require("express-validator")
const router = Router()

router.post("/login", iniciarSesion)
router.post("/recoveryPass", recuperarPassUser)
router.post("/changeNewPassUser", cambioPassUserToken)

router.get("/", obtenerTodosLosUsuarios)

router.post("/", [
  check("nombreUsuario", "Campo NOMBRE vacio").notEmpty(),
  check("nombreUsuario", "El nombre de usuario debe tener un mínimo de 5 caracteres").isLength({ min:5 }),
  check("emailUsuario", "Formato incorrecto").isEmail(),
  check("password", "ERROR, debe tener un mínimo de 8 caracteres").isLength({ min:8 })
], crearNuevoUsuario)

router.get("/:id", [
  check("id","ERROR. El formato de ID no corresponde a MongoDB").isMongoId()
], obtenerUsuarioPorId)

router.put("/:id", [
  check("id", "ERROR. El formato de ID no corresponde a MongoDB").isMongoId(),
  check("nombreUsuario", "Campo NOMBRE vacio").optional().notEmpty(),
  check("nombreUsuario", "El nombre de usuario debe tener un mínimo de 5 caracteres").optional().isLength({ min: 5 }),
  check("emailUsuario", "Formato incorrecto").optional().isEmail(),
  check("password", "ERROR, debe tener un mínimo de 8 caracteres").optional().isLength({ min: 8 })
], actualizarUsuario)

router.delete("/:id", [
  check("id", "ERROR. El formato de ID no corresponde a MongoDB").isMongoId()
], eliminarUsuario)

module.exports = router
