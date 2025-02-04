import express from "express";
import cors from "cors"; 
import { EnrutadorCliente } from "./routes/VendedorRouter.js";
import { Vendedor } from "./models/vendedor.js";
import connectDB from "./models/db.js";
const app = express();
const PORT = 4000;

connectDB();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.json({ message: 'Servidor en funcionamiento' });
});


app.use("/api/vendedores", EnrutadorCliente(Vendedor));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
