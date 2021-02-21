import { app } from './app';
import './mongoose';

import dotenv from 'dotenv';

dotenv.config();

const port = 3001;

app.listen(port, () => {
	console.log('------------------------------');
	console.log(`App listening on port ${port}`);
});
