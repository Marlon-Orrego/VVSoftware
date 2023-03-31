const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Estudiante = require("./models/Estudiante");

mongoose.set("strictQuery", false);

// Conectar a la base de datos
async function connect() {
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;
  const dbname = process.env.DB_NAME;
  const uri = `mongodb+srv://${user}:${password}@cluster0.rwhcdqs.mongodb.net/${dbname}?retryWrites=true&w=majority`;

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Conectado a la base de datos");
}

// Cerrar la conexión a la base de datos
async function close() {
  await mongoose.connection.close();
  console.log("Conexión a la base de datos cerrada");
}

// Crear la aplicación Express
const app = express();

// Analizar el cuerpo de las solicitudes HTTP
app.use(bodyParser.json());

// Definir los endpoints REST para el CRUD de estudiantes
app.get("/estudiantes", async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.send(estudiantes);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

app.get("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    res.send(estudiante);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

app.post("/estudiantes", async (req, res) => {
  try {
    const estudiante = new Estudiante(req.body.estudiante);
    await estudiante.save();
    res.send(estudiante);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

app.put("/estudiantes/:id", async (req, res) => {
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

app.delete("/estudiantes/:id", async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
    res.send(estudiante);
  } catch (err) {
    res.status(500).send("Error en el servidor");
  }
});

// Exportar la aplicación y los métodos connect y close
module.exports = app;
