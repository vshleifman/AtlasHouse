import './db/mongoose';

import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
	res.send('Hello Worald');
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
