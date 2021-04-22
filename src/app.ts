import './mongoose';

import express from 'express';

import userRouter from './api/UserRoutes';
import authRouter from './api/AuthRoutes';
import propertyRouter from './api/PropertyRoutes';
import adminRouter from './api/AdminRoutes';
import bookingRouter from './api/BookingRoutes';

import exceptionHandler from './api/exceptionHandler';
import multer from 'multer';

export const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello Worald');
});

const upload = multer({ dest: 'uploads' });

app.post('/upload', upload.single('upload'), (req, res) => {
	try {
		console.log(req);

		res.send();
	} catch (error) {
		res.send(error);
	}
});
app.use(authRouter);
app.use(propertyRouter);
app.use(userRouter);
app.use(bookingRouter);
app.use(adminRouter);

app.use(exceptionHandler);
