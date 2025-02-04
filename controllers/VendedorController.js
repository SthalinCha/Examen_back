export class VendedorController {
    constructor(modelo) {
      this.modelo = modelo;
    }

    getAll = async (req, res) => {
      try {
        const vendedores = await this.modelo.getAll();
        res.json(vendedores);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener los vendedores", detalle: error.message });
      }
    };

    getOneById = async (req, res) => {
      try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ error: "ID inválido" });
        }
  
        const vendedor = await this.modelo.getOneById(id);
        if (!vendedor) {
          return res.status(404).json({ error: "Vendedor no encontrado" });
        }
        res.json(vendedor);
      } catch (error) {
        res.status(500).json({ error: "Error al buscar al vendedor", detalle: error.message });
      }
    };
    

    create = async (req, res) => {
      try {
        const { nombre, articulos, precio, codigo_pago, total} = req.body;
  
        if (!nombre || articulos == null || precio == null || codigo_pago== null|| total== null ||  codigo_pago == null) {
          return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
  
        const nuevoVendedor = await this.modelo.create(req.body);
        res.status(201).json(nuevoVendedor);
      } catch (error) {
        res.status(500).json({ error: "Error al crear el vendedor", detalle: error.message });
      }
    };
  
   
    update = async (req, res) => {
      try {
        const { id } = req.params;
        const { nombre, articulos, precio, codigo_pago, total } = req.body;
  
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ error: "ID inválido" });
        }
  
        if (!nombre || articulos == null || precio == null || codigo_pago== null|| total== null ||  codigo_pago == null) {
          return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
  
        const clienteActualizado = await this.modelo.update(id, req.body);
        if (!clienteActualizado) {
          return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json(clienteActualizado);
      } catch (error) {
        res.status(500).json({ error: "Error al actualizar el cliente", detalle: error.message });
      }
    };
  
    // Eliminar un cliente
    delete = async (req, res) => {
      try {
        const { id } = req.params;
  
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
          return res.status(400).json({ error: "ID inválido" });
        }
  
        const eliminado = await this.modelo.delete(id);
        if (!eliminado) {
          return res.status(404).json({ error: "vendedor no encontrado" });
        }
        res.status(204).send(); // No devuelve contenido
      } catch (error) {
        res.status(500).json({ error: "Error al eliminar el vendedor", detalle: error.message });
      }
    };
  }
  