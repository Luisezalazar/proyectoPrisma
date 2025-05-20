import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
//Call functions
const router = express.Router();
const prisma = new PrismaClient();

//Routes for client
router.post("/createClient", async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body
        //Validation
        if (!nombre || !email || !telefono) {
            return res.status(400).json({ error: "required fields are missing" });
        }
        const cliente = await prisma.cliente.create({
            data: {
                nombre,
                email,
                telefono
            }
        })
        res.json(cliente)
    } catch (error) {
        console.error("Error creating client", error);
    }
});

export default router;