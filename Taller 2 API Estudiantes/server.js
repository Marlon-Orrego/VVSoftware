const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Conectar a la base de datos
const user="Mao";
const password="U3SQSYLdhsklSufe";
const dbname="DbEstudiantes"
const uri=`mongodb+srv://${user}:${password}@cluster0.rwhcdqs.mongodb.net/${dbname}?retryWrites=true&w=majority`; 

mongoose.set("strictQuery", false);
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology:true });

// Crear el modelo de Estudiante
const Estudiante = mongoose.model('Estudiante', {
  name: String,
  age: Number,
  career: String
});

// Crear la aplicación Express
const app = express();

// Analizar el cuerpo de las solicitudes HTTP
app.use(bodyParser.json());

// Definir los endpoints REST para el CRUD de estudiantes
app.get('/estudiantes', async (req, res) => {
  const estudiantes = await Estudiante.find();
  res.send(estudiantes);
});

app.get('/estudiantes/:id', async (req, res) => {
  const estudiante = await Estudiante.findById(req.params.id);
  res.send(estudiante);
});

app.post('/estudiantes', async (req, res) => {
  const estudiante = new Estudiante(req.body);
  await estudiante.save();
  res.send(estudiante);
});

app.put('/estudiantes/:id', async (req, res) => {
  const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body);
  res.send(estudiante);
});

app.delete('/estudiantes/:id', async (req, res) => {
  const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
  res.send(estudiante);
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

module.exports = app
module.exports = Estudiante
