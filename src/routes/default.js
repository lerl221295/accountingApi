import { Router } from 'express';
import models from '../models';

const account = models.Account();

const router = Router();

router
	.get('/', async (req, res) => {
		const balance = await account.getBalance();
		res.send({balance});
	});


export default router;

