const mongoose = require("mongoose");

const estudianteSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
});

const Estudiante = mongoose.model("Estudiante", estudianteSchema);

module.exports = Estudiante;
