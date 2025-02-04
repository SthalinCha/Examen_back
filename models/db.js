import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/loginDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión exitosa a MongoDB en localhost");
  } catch (error) {
    console.error("Error conectando a MongoDB en localhost:", error.message);
    process.exit(1); // Termina el proceso en caso de error
  }
};

// Exportación por defecto
export default connectDB;