import express from 'express';
import cors from 'cors';
import movies from './api/movies.route.js';

//create the server with:
const app = express();

//Which will use cors and express.json
app.use(cors());
app.use(express.json());

//specify initial routes
app.use('/api/v1/movies', movies);
app.use('*', (req, res) => {
	//if request isn't fulfilled, alert user with error
	res.status(404).json({ error: 'not found' });
});

//export as module so other files can import it
export default app;
