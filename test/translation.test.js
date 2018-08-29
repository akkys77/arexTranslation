//During the test the env variable is set to test
// process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../dist/index');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Translations', () => {
  // beforeEach(done => {});
  /*
  * Test the /GET route
  */
  describe('/GET translation', () => {
    it('it should GET a status code of 400 and a message redirecting to POST', done => {
      chai
        .request('http://localhost:8080')
        .get('/api/v1/translate')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an
            .instanceof(Object)
            .and.to.have.property('message')
            .that.includes('You should use POST not GET');
          done();
        });
    });
  });
  describe('/POST translation', () => {
    it('it should translate correctly a string', done => {
      let textToTranslate = {
        textToTranslate: 'The design is state-of-the-art'
      };

      chai
        .request('http://localhost:8080')
        .post('/api/v1/translate')
        .send(textToTranslate)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an
            .instanceof(Object)
            .and.to.have.property('translatedString')
            .eql('Ethay esignday isway atestay-ofway-ethay-artway');
          done();
        });
    });
  });
  describe('/POST bad request for translation', () => {
    it('it should return appropriate error status and message', done => {
      let textToTranslate = {
        text: 'The design is state-of-the-art'
      };

      chai
        .request('http://localhost:8080')
        .post('/api/v1/translate')
        .send(textToTranslate)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an
            .instanceof(Object)
            .and.to.have.property('message')
            .eql('request should be JSON object with the \"textToTranslate\" property containing the text to translate');
          done();
        });
    });
  });
});
