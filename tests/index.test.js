const request = require("supertest");
const app = require("../app");
const Estudiante = require("../models/Estudiante");

jest.mock("../src/models/Estudiante", () => {
  const mongoose = require("mongoose");
  const EstudianteSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    cedula: String,
  });

  return {
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    model: jest.fn(() => ({
      Estudiante: mongoose.model("Estudiante", EstudianteSchema),
    })),
  };
});

describe("Endpoints de estudiantes", () => {
  const estudiantePrueba = {
    _id: "60d88834e7924f3cd4eb9b13",
    nombre: "Juan",
    edad: 20,
    cedula: "1000417521",
  };
  const estudiantePrueba2 = {};

  describe("GET /estudiantes", () => {
    it("Debería devolver todos los estudiantes", async () => {
      Estudiante.find.mockReturnValue([estudiantePrueba]);
      const response = await request(app).get("/estudiantes");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([estudiantePrueba]);
    });

    describe("GET /estudiantes", () => {
      it("Debería devolver un arreglo vacío si no hay estudiantes", async () => {
        Estudiante.find.mockReturnValue([estudiantePrueba2]);
        const response = await request(app).get("/estudiantes");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([estudiantePrueba2]);
      });
    });

    it("Debería manejar errores correctamente", async () => {
      Estudiante.find.mockRejectedValue(new Error("Error en la base de datos"));
      const response = await request(app).get("/estudiantes");
      expect(response.status).toBe(500);
      expect(response.text).toBe("Error en el servidor");
    });
  });

  describe("GET /estudiantes/:id", () => {
    it("Debería devolver un estudiante por su ID", async () => {
      Estudiante.findById.mockReturnValue(estudiantePrueba);
      const response = await request(app).get(
        `/estudiantes/${estudiantePrueba._id}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(estudiantePrueba);
    });

    it("Debería manejar errores correctamente", async () => {
      Estudiante.findById.mockRejectedValue(
        new Error("Error en la base de datos")
      );
      const response = await request(app).get(
        `/estudiantes/${estudiantePrueba._id}`
      );
      expect(response.status).toBe(500);
      expect(response.text).toBe("Error en el servidor");
    });
  });

  describe("POST /estudiantes", () => {
    it("Debería manejar errores correctamente", async () => {
      Estudiante.create.mockRejectedValue(
        new Error("Error en la base de datos")
      );
      const response = await request(app).post("/estudiantes").send({});
      expect(response.status).toBe(500);
      expect(response.text).toBe("Error en el servidor");
    });
  });
  describe("PUT /estudiantes/:id", () => {
    it("Debería actualizar un estudiante existente", async () => {
      const estudianteActualizado = {
        nombre: "Pedro",
        edad: 23,
        cedula: "1000417520",
      };
      Estudiante.findByIdAndUpdate.mockReturnValue(estudianteActualizado);
      const response = await request(app)
        .put(`/estudiantes/${estudiantePrueba._id}`)
        .send(estudianteActualizado);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(estudianteActualizado);
    });

    it("Debería manejar errores correctamente", async () => {
      Estudiante.findByIdAndUpdate.mockRejectedValue(
        new Error("Error en la base de datos")
      );
      const response = await request(app)
        .put(`/estudiantes/${estudiantePrueba._id}`)
        .send({});
      expect(response.status).toBe(500);
      expect(response.text).toBe("Error en el servidor");
    });
  });

  describe("DELETE /estudiantes/:id", () => {
    it("Debería eliminar un estudiante existente", async () => {
      Estudiante.findByIdAndDelete.mockReturnValue(estudiantePrueba);
      const response = await request(app).delete(
        `/estudiantes/${estudiantePrueba._id}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(estudiantePrueba);
    });

    it("Debería manejar errores correctamente", async () => {
      Estudiante.findByIdAndDelete.mockRejectedValue(
        new Error("Error en la base de datos")
      );
      const response = await request(app).delete(
        `/estudiantes/${estudiantePrueba._id}`
      );
      expect(response.status).toBe(500);
      expect(response.text).toBe("Error en el servidor");
    });
  });
});
