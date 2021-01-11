import { app } from './app';
import './db/mongoose';

const port = process.env.PORT || 3001;

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
