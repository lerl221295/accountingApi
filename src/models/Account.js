import { EventEmitter } from 'events';

var AccountInstance;

class Account {
    constructor() {
        this.balance = 0;
        this.transactions = [];

        this._locked = false;
        this._emitter = new EventEmitter();

	
		this.credit = this.credit.bind(this);	
		this.debit = this.debit.bind(this);
		this.getTransactions = this.getTransactions.bind(this);
		this.getTransaction = this.getTransaction.bind(this);
    }

    transactionMaker = (type) => (amount) => ({
        id: this.transactions.length,
        type,
        amount,
        effectiveDate: new Date()
    });

    acquire(lock = true) {
        return new Promise(resolve => {
            if (!this._locked) {
                this._locked = lock;
                return resolve();
            }

            const tryAcquire = () => {
                if (!this._locked) {
                    this._locked = lock;
                    this._emitter.removeListener('release', tryAcquire);
                    return resolve();
                }
            };
            this._emitter.on('release', tryAcquire);
        });
    }

    release() {
	    this._locked = false;
	    setImmediate(() => this._emitter.emit('release'));
  	}

    async credit(amount) {
    	await this.acquire();
        const getTransaction = this.transactionMaker('credit');
        this.balance += amount;
        const transaction = getTransaction(amount);
        this.transactions.push(transaction);
        this.release();
        return transaction;
    }

    async debit(amount) {
    	await this.acquire();
        if (this.balance < amount) {
        	this.release();
            throw Error('Insufficient founds');
        }
        const getTransaction = this.transactionMaker('debit');
        this.balance -= amount;
        const transaction = getTransaction(amount);
        this.transactions.push(transaction);
        this.release();
        return transaction;
    }

    async getTransactions() {
		await this.acquire(false);
		return this.transactions;
    };

    async getTransaction(transactionId) {
    	await this.acquire(false);
		return this.transactions.find(({id}) => id === parseInt(transactionId));
    };

    async getBalance() {
    	await this.acquire(false);
    	return this.balance;
    }
}

export default function() {
	if(!AccountInstance){
		AccountInstance = new Account();
	}
	return AccountInstance;
};