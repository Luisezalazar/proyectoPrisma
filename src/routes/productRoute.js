import express from "express";
import pkg from "@prisma/client"
const { PrismaClient } = pkg;

//Call functions
const router = express.Router();
const prisma = new PrismaClient();

//Route for product
//POST
router.post("/createProduct", async (req, res) => {
    try {


        const { nombre, precio, stock } = req.body
        //Validation
        if (!nombre || !precio || !stock) {
            return res.status(400).json({ error: "required fields are missing" })
        }
        if(stock < 0 || precio < 0){
            return res.status(400).json({error: "You cannot enter negative values"})
        }
        const product = await prisma.producto.create({
            data: {
                nombre,
                precio,
                stock
            }
        })
        res.json(product)
    } catch (error) {
        console.error("Error creating product", error)
    }
})
export default router;