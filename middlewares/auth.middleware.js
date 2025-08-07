const jwt = require("jsonwebtoken");

//el 3er parametrro que recibe la funcion es un callback que se lo abrevia como cb o next
module.exports = (rolRuta) => (req, res, next) => {
  const token = req.header("auth");
  console.log(token);
  const verificarUsuario = jwt.verify(token, process.env.JWT_SECRET);
  console.log(verificarUsuario);

  if (rolRuta === verificarUsuario.rolUsuario) {
    req.idCarrito = verificarUsuario.idCarrito;
    req.idUsuario = verificarUsuario.idUsuario;
    next();
  } else {
    res.status(401).json({ msg: "No estas autorizado" });
  }
};
