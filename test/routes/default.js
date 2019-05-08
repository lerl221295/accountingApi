//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

let should = chai.should();
chai.use(chaiHttp);

describe('Default -> balance', (done) => {
    it('It should get balance number', (done) => {
        chai.request(server)
            .get('/default')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('balance');
                res.body.balance.should.be.a('number');
                done();
            });
    });
})