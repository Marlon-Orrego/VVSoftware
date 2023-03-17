const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const expect = chai.expect;
const app = require("../Taller 2 API Estudiantes/app");
const Estudiante = require("../Taller 2 API Estudiantes/models/Estudiante");

chai.use(chaiHttp);

describe("GET /estudiantes", () => {
  it("Obtenemos todos los estudiantes", (done) => {
    const stub = sinon.stub(Estudiante, "find").resolves([]);
    chai
      .request(app)
      .get("/estudiantes")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        stub.restore();
        done();
      });
  });
});

describe("GET /estudiantes/:id", () => {
  it("Obtenemos un estudiante por su ID", async () => {
    const estudiante = new Estudiante({
      name: "Valeria",
      id: "1001841471",
      age: 21,
      career: "Ingenieria de Sistemas",
    });
    const stub = sinon.stub(Estudiante, "findById").resolves(estudiante);
    const res = await chai.request(app).get("/estudiantes/" + estudiante.id);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.name).to.equal("Valeria");
    stub.restore();
  });
});

chai.use(chaiHttp);

describe("POST /estudiantes", () => {
  it("Crea un nuevo estudiante", (done) => {
    const stub = sinon.stub(Estudiante.prototype, "save").resolves({
      id: "112233",
      name: "Julian",
      age: 22,
      career: "Ingenieria Civil",
    });
    chai
      .request(app)
      .post("/estudiantes")
      .send({
        id: "112233",
        name: "Julian",
        age: 22,
        career: "Ingenieria Civil",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.name).to.equal("Julian");
        stub.restore();
        done();
      });
  });
});

describe("PUT /estudiantes/:id", () => {
  it("Actualiza un estudiante existente", async () => {
    const estudiante = new Estudiante({
      id: "12312312312",
      name: "Laura",
      age: 18,
      career: "Ingenieria Ambiental",
    });
    const stub = sinon.stub(Estudiante, "findByIdAndUpdate").resolves({
      id: estudiante.id,
      name: "Laura",
      age: estudiante.age,
      career: estudiante.career,
    });
    const res = await chai
      .request(app)
      .put("/estudiantes/" + estudiante.id)
      .send({ name: "Laura" });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.name).to.equal("Laura");
    stub.restore();
  });
});
//Prueba para el endpoint DELETE /estudiantes/:id:
describe("DELETE /estudiantes/:id", () => {
  it("Elimina un estudiante existente", async () => {
    const estudiante = new Estudiante({
      id: "1001841471",
      name: "Valeria Mondragón Roldan",
      age: 21,
      career: "Ingenieria de Sistemas",
    });
    const saveStub = sinon.stub(estudiante, "save").resolves(estudiante);
    const deleteStub = sinon
      .stub(Estudiante, "findByIdAndDelete")
      .resolves(estudiante);

    const res = await chai.request(app).delete("/estudiantes/" + estudiante.id);

    expect(res).to.have.status(200);
    expect(deleteStub.calledOnce).to.be.true;
    saveStub.restore();
    deleteStub.restore();
  });
});
