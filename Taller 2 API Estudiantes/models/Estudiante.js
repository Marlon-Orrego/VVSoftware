const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  cedula: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("estudiante", studentSchema);
