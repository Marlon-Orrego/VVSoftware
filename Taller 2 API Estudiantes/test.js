const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('./server');
const Estudiante =require('./server')

/*
chai.use(chaiHttp);/*
describe('GET /estudiantes', () => {
  it('devuelve todos los estudiantes', (done) => {
    chai.request(app)
      .get('/estudiantes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

*/
/*
describe('GET /estudiantes/:id', () => {
  it('Obtenemos un estudiante por su ID', async () => {
    const estudiante = new Estudiante({ name: 'Valeria', age: 21, career: 'Ingenieria de Sistemas' });
    await estudiante.save();
    chai.request(app)
      .get('/estudiantes/' + estudiante.id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Valeria');
      });
  });
});
*/

chai.use(chaiHttp);
//Prueba para el endpoint POST /estudiantes:
describe('POST /estudiantes', () => {
  it('Crea un nuevo estudiante', (done) => {
    chai.request(app)
      .post('/estudiantes')
      .send({ name: 'Julian', age: 22, career: 'Ingenieria Civil' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Julian');
        done();
      });
  });
});

/*
//Prueba para el endpoint PUT /estudiantes/:id:
describe('PUT /estudiantes/:id', () => {
  it('Actualiza un estudiante existente', async () => {
    const estudiante = new Estudiante({ name: 'Laura', age: 18, career: 'Ingenieria Ambiental' });
    await estudiante.save();
    chai.request(app)
      .put('/estudiantes/' + estudiante.id)
      .send({ name: 'Laura' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal('Laura');
        done();
      });
    });
  });
*/