const mongoose = require("mongoose");

const Estudiante = mongoose.model("Estudiante", {
  name: String,
  id: String,
  age: Number,
  career: String,
});

module.exports = Estudiante;
