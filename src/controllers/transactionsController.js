import models from '../models';
import validate from 'validate.js';

class AccountController {
    constructor() {
        this.list = this.list.bind(this);
        this.create = this.create.bind(this);
        this.get = this.get.bind(this);
        this.account = models.Account();
    }

    async list(req, res) {
        const transactions = await this.account.getTransactions();
        res.send(transactions);
    }

    validateTransactionParams(req) {
        const constrains = {
            type: {
                presence: true,
                inclusion: {
                    within: ['credit', 'debit'],
                    message: '^Invalid Operation'
                }
            },
            amount: {
                presence: true,
                numericality: true
            }
        }
        return validate(req.body, constrains);
    }

    async create(req, res) {
        const errors = this.validateTransactionParams(req);
        if(errors){
            return res.status(400).send({errors});
        }

        const transactionFn = this.account[req.body.type];
        try {
            const transaction = await transactionFn(req.body.amount);
            res.send(transaction);
        } catch (e) {
            res.status(409).send({error: e.message});
        }
    }

    async get(req, res) {
        const transaction = await this.account.getTransaction(req.params.id);
        if(transaction){
            res.send(transaction);
        } else {
            res.status(404).send();
        }
        
    }
}

export default new AccountController