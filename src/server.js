import "babel-polyfill";
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import cors from 'cors';
import {config} from 'dotenv';

config();

let app = express(),
	port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
routes(app);
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to Accounting API!!!" });
});
app.listen(port);

module.exports = app;

console.log('Server running in port: ' + port);
