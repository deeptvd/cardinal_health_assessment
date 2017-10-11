const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');

describe('POST /matchdna', () => {
  it('should return parent2 as donor', (done) => {
    var input = {
     'parent1': 'CATABACT',
     'parent2': 'CABBBBBA',
     'child': 'CABCATCABCATBBBBBTC'
   }

   request(app)
    .post('/matchdna')
    .send(input)
    .expect(200)
    .expect((res) => {
      expect(res.body.donor).toBe('parent2');
      done();
    })
    .end((err, res) => {
      if(err) {
         return done(err);
      }
    });
  });

  it('should return parent1 as donor', (done) => {
    var input = {
      'parent1': 'CABACABATG',
      'parent2': 'TTCBTGABCT',
      'child': 'CBBTTCACTCABATGTTCTTCTTCB'
   }

   request(app)
    .post('/matchdna')
    .send(input)
    .expect(200)
    .expect((res) => {
      expect(res.body.donor).toBe('parent1');
      done();
    })
    .end((err, res) => {
      if(err) {
         return done(err);
      }
    });
  });

});
