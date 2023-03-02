import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import MoviesDAO from './dao/moviesDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';

async function main() {
	//call this to load env variables
	dotenv.config();

	//create an instance of MongoClient and pass in uri
	//retrieve the port from the env variable. If we can't try 8000
	const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI);

	const port = process.env.PORT || 8000;

	try {
		//connect mongodb cluster
		//wait until this function is completed, then move on
		await client.connect();
		await MoviesDAO.injectDB(client);
		await ReviewsDAO.injectDB(client);

		// if there are no errors, then we start the server
		app.listen(port, () => {
			console.log('Server is running on port:' + port);
		});
	} catch (e) {
		console.log('Not connected!');
		console.error(e);
		process.exit(1);
	}
}
main().catch(console.error);
