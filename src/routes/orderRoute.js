import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

//Call functions
const router = express.Router();
const prisma = new PrismaClient();
//Route for order
//POST
router.post("/createOrder", async (req, res) => {
    const {estado, cliente, Producto} = req.body
    let subtotal=0
    let total=0

    const order = await prisma.pedido.create({
        data:{estado,cliente:{connect:{id:(cliente)}}}
    })

    const items = await Promise.all(
        Producto.map(async (producto) => {
            const findProduct = await prisma.producto.findUnique({
                where:{
                    id:(producto.id)
                }
            })
            //Validations
            if(!findProduct){throw new Error ("The product was not found")}
            if(findProduct.stock<0){throw new Error ("There is no stock")}
            if(producto.cantidad < 1){throw new Error ("The quantity must be grater than 0")}
            if(findProduct.stock< producto.cantidad){throw new Error ("There is not enough stock for that quantity")}
            //Count
            subtotal = findProduct.precio * producto.cantidad
            total += subtotal
            //ItemOrder
            return await prisma.itemPedido.create({
                data:{
                    cantidad:producto.cantidad,
                    subtotal,
                    producto:{connect:{id:(producto.id)}},
                    pedido:{connect:{id:order.id}}
                }
            })
        }))
        console.log(total)
        res.json(items)
    
})

//GET
router.get("/getOrder", async (req, res) => {
    const getOrder = await prisma.pedido.findMany({
        include:{
            cliente:true,
            ItemPedido:true,
            
        }
    })
    res.json(getOrder)
})





export default router;