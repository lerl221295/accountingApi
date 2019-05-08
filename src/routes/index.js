import transactionsRoutes from './transactions';
import defaultRoutes from './default';

export default function(app) {
	app.use('/transactions', transactionsRoutes);
	app.use('/default', defaultRoutes);
}