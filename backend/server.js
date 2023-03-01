import express from 'express';
import cors from 'cors';
import movies from './api/movies.route.js';

//Create the server with express
const app = express();

//Which will use cors(cross-origin...) and express.json
app.use(cors());
app.use(express.json());

//specify initial routes for the url paths
app.use('/api/v1/movies', movies);
app.use('*', (req, res) => {
	//if request isn't fulfilled, alert user with error
	res.status(404).json({ error: 'not found' });
});

//export as module so other files can import it
export default app;
