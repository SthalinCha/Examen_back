import mongoose from "mongoose";
const VendedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  articulos: { type: String, required: true },
  precio: { type: Number, required: true },
  codigo_pago: { type: Number, required: true },
  total: { type: Number, required: true }
});


export const VendedorModel = mongoose.model("Vendedor", VendedorSchema);

export class Vendedor {
    static calcularVenta(total, codigo_pago) {
        let totalventas = 0; // Initialize it
        if (codigo_pago < 2) {
            totalventas = total * 0.15;
        } else if (codigo_pago < 3 && codigo_pago > 1) {
            totalventas = total * 0.1;
        } else if (codigo_pago < 4 && codigo_pago > 2) {
            totalventas = total * 0.5;
        } else if (codigo_pago < 5 && codigo_pago > 3) {
            totalventas = total * 0.3;
        }
        return Math.max(totalventas);
    }
    

  static async getAll() {
    return await VendedorModel.find();
  }

  static async getOneById(id) {
    return await VendedorModel.findById(id);
  }

  static async create(data) {
    data.totali = this.calcularVenta(data.total, data.codigo_pago);
    const nuevoVendedor = new VendedorModel(data);
    return await nuevoVendedor.save();
  }

  // Actualizar un cliente y recalcular el bono
  static async update(id, data) {
    data.totali = this.calcularVenta(data.total, data.codigo_pago);
    return await VendedorModel.findByIdAndUpdate(id, data, { new: true });
  }

  // Eliminar un cliente
  static async delete(id) {
    return await VendedorModel.findByIdAndDelete(id);
  }
}
