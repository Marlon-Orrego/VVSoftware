const express = require("express");
const Estudiante = require("../models/Estudiante");

// Crear la aplicación Express
const router = express.Router();

// Definir los endpoints REST para el CRUD de estudiantes
router.get("/estudiantes", async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.send(estudiantes);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

router.get("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    res.send(estudiante);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

router.post("/estudiantes", async (req, res) => {
  try {
    const estudiante = new Estudiante({
      nombre: req.body.nombre,
      edad: req.body.edad,
    });
    await estudiante.save();
    res.send(estudiante);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

router.put("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Agregar este objeto para que devuelva el objeto actualizado
    );
    res.send(estudiante);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

router.delete("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
    res.send(estudiante);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

// Exportar la aplicación y los métodos connect y close
module.exports = { router };
