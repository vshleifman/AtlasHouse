// import { config } from 'dotenv';
// config({ path: '../.env.test' });
import { app } from './app';
import './mongoose';

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log('------------------------------');
	console.log(`App listening on port ${port}`);
});
