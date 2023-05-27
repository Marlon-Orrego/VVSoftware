const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routers/estudiante.router");
const app = express();
app.use(bodyParser.json()); // Middleware para procesar el cuerpo de las solicitudes en formato JSON
app.use(cors()); // Middleware para permitir el acceso a la API desde cualquier origen
app.use(router.router);
const puerto = 3001;
module.exports = app;
