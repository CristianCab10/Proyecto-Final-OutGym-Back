const { 
    agregarProductosCarritoServices, 
    eliminarProductoCarritoIdServices, 
    obtenerTodosLosProductosDelCarritoServices,
    mercadoPagoServices 
} = require("../services/carritos.services");


const obtenerTodosLosProductosDelCarrito = async (req, res) => {
    const { msg, productos, error, statusCode } = await obtenerTodosLosProductosDelCarritoServices(req.idCarrito)
    try {
        res.status(statusCode).json({msg, productos})
    } catch {
        res.status(statusCode).json({error})
    }
}

const agregarProductosCarrito = async (req, res) => {
    const { statusCode, msg, error } = await agregarProductosCarritoServices(req.idCarrito, req.params.idProducto)
    try {
        res.status(statusCode).json({msg})
    } catch {
        res.status(statusCode).json({error})
    }
}

const eliminarProductoCarritoId = async (req, res) => {
    const { msg, statusCode, error } = await eliminarProductoCarritoIdServices(req.idCarrito, req.params.idProducto)
    try {
        res.status(statusCode).json({msg})
    } catch {
        res.status(statusCode).json({error})
    }
}

const pagarCarritoMp = async (req, res) => { 
    const {statusCode, msg, error, init_point} = await mercadoPagoServices();
    try {
        res.status(statusCode).json({msg, init_point});
    } catch {
        res.status(statusCode).json({error});
    }
};


module.exports = { agregarProductosCarrito,
     eliminarProductoCarritoId, 
     obtenerTodosLosProductosDelCarrito, 
     pagarCarritoMp }