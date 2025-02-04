import { Router } from "express";
import { VendedorController } from "../controllers/VendedorController.js";

export const EnrutadorCliente = (modelo) => {
  const controlador = new VendedorController(modelo);
  const vendedorRouter = Router();

  vendedorRouter.get("/", controlador.getAll);
  vendedorRouter.get("/:id", controlador.getOneById);
  vendedorRouter.post("/", controlador.create);
  vendedorRouter.put("/:id", controlador.update);
  vendedorRouter.delete("/:id", controlador.delete);

  return vendedorRouter;
};
