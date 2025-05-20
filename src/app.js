import express from "express";
import clientRoute from "./routes/clientRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";


const app = express();

app.use(express.json());
app.use('/api/client', clientRoute)
app.use('/api/product', productRoute )
app.use('/api/order', orderRoute)

const port = 3000;
app.listen(port, () => console.log(`Esperando ${port}`))