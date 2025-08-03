const CarritosModel = require("../models/carritoModel")

const obtenerTodosLosProductosDelCarritoServices = async (idCarrito) => {
    try {
        const carrito = await CarritosModel.findOne({_id: idCarrito})
        return {
            productos: carrito.productos,
            statusCode: 200
        }
    } catch (error) {
        return {
            error,
            statusCode: 500
        }
    }
}

const agregarProductosCarritoServices = async (idCarrito, idProducto) => {
    try {
        const carrito = await CarritosModel.findOne({_id:idCarrito})
        const producto = await ProductosModel.findOne({_id:idProducto})
        const productoExiste = carrito.productos.find((prod) => prod._id.toString() === producto._id.toString())
        if(productoExiste) {
            return{
                msg: "El producto ya está en el carrito",
                statusCode: 422
            }
        }
        carrito.productos.push(producto)
        await carrito.save()

        return {
            msg: "Producto cargado al carrito",
            statusCode: 200
        }
    } catch (error) {
        return {
            error,
            statusCode: 500
        }
    }
}

const eliminarProductoCarritoIdServices = async (idCarrito, idProducto) => {
    try {
        const carrito = await CarritosModel.findOne({_id:idCarrito})
        const productoExiste = carrito.productos.find((prod) => prod._id.toString() === idProducto)
        if(!productoExiste) {
            return {
                msg: "ERROR. El producto que inenta borrar no existe",
                statusCode: 404
            }
        }
        const productoIndex = carrito.productos.findIndex((prod) => prod._id.toString() === idProducto)
        carrito.productos.splice(productoIndex, 1)
        await carrito.save()
        return {
            msg: "Producto eliminado",
            statusCode: 200
        }
    } catch (error) {
        return {
            error,
            statusCode: 500
        }
    }
}

module.exports = { agregarProductosCarritoServices, eliminarProductoCarritoIdServices, obtenerTodosLosProductosDelCarritoServices }