import './db/mongoose';

import express from 'express';

import userRouter from './api/UserRoutes';

export const app = express();
app.use(express.json());
app.use(userRouter);

app.get('/', (req, res) => {
	res.send('Hello Worald');
});

console.log('app.ts');
