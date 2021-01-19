import './mongoose';

import express from 'express';

import userRouter from './api/UserRoutes';
import authRouter from './api/AuthRoutes';

import exceptionHandler from './api/exceptionHandler';

export const app = express();
app.use(express.json());

app.use(userRouter);
app.use(authRouter);

app.get('/', (req, res) => {
	res.send('Hello Worald');
});

app.use(exceptionHandler);
