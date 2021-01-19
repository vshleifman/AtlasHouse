import './db/mongoose';

import express from 'express';

import userRouter from './api/UserRoutes';
import authRouter from './api/AuthRoutes';

import exceptionHandler from './api/exceptionHandler';

export const app = express();
app.use(express.json());

app.use(userRouter);
app.use((req, res, next) => {
	console.log('app.use');
	next();
});
app.use(authRouter);
app.use(exceptionHandler);

app.get('/', (req, res) => {
	res.send('Hello Worald');
});
