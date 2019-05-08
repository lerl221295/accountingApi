//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);

let transactionKeys = ['id', 'type', 'amount', 'effectiveDate'];
let firstTransactionId;

describe('Transactions', (done) => {
    it('It should get empty transactions list', (done) => {
        chai.request(server)
            .get('/transactions')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
    });

    it('It should save a credit transaction', (done) => {
    	const operation = {
    		type: 'credit',
    		amount: 1000
    	};
        chai.request(server)
            .post('/transactions')
            .send(operation)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.all.keys(...transactionKeys);
                firstTransactionId = res.body.id;
                done();
            });
    });

    it('It should not allow an invalid debit transaction', (done) => {
    	const operation = {
    		type: 'debit',
    		amount: 1001
    	};
        chai.request(server)
            .post('/transactions')
            .send(operation)
            .end((err, res) => {
                res.should.have.status(409);
                done();
            });
    });

    it('It should get one transaction by ID', (done) => {
        chai.request(server)
            .get(`/transactions/${firstTransactionId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.all.keys(...transactionKeys);
                done();
            });
    });

    it('It should allow a valid debit transaction', (done) => {
    	const operation = {
    		type: 'debit',
    		amount: 999
    	};
        chai.request(server)
            .post('/transactions')
            .send(operation)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.all.keys(...transactionKeys);
                done();
            });
    });

    it('It should get non-empty transactions list', (done) => {
        chai.request(server)
            .get('/transactions')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.every(i => 
                	expect(i).to.have.all.keys(...transactionKeys));
                
                done();
            });
    });
})