import "babel-polyfill";
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import {config} from 'dotenv';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./docs/swagger.json');

config();

let app = express(),
	port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
routes(app);
app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(swaggerDocument, {explorer: true}));
app.listen(port);

module.exports = app;

console.log('Server running in port: ' + port);
