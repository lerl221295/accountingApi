import { Router } from 'express';
import transactionsController from '../controllers/transactionsController';

const router = Router();

router
	.get('/', transactionsController.list)
	.post('/', transactionsController.create);

router
	.get('/:id', transactionsController.get)

export default router;

