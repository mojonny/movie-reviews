import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

//store the db reference in movies. This gives us access to the db
let movies;

export default class MoviesDAO {
	//connect to db
	static async injectDB(conn) {
		if (movies) {
			return;
		}
		//if movies already exists then return else we go ahead
		try {
			movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies');
		} catch (e) {
			console.error(`unable to connect in MoviesDAO: ${e}`);
		}
	}

	//Retrieving movies
	static async getMovies({
		filters = null,
		page = 0,
		moviesPerPage = 20, //get only 20 at a time
	} = {}) {
		let query;
		if (filters) {
			if ('title' in filters) {
				query = { $text: { $search: filters['title'] } };
			} else if ('rated' in filters) {
				query = { rated: { $eq: filters['rated'] } };
			}
		}

		let cursor;
		try {
			cursor = await movies
				.find(query)
				.limit(moviesPerPage)
				.skip(moviesPerPage * page);
			const moviesList = await cursor.toArray();
			const totalNumMovies = await movies.countDocuments(query);
			return { moviesList, totalNumMovies };
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { moviesList: [], totalNumMovies: 0 };
		}
	}

	static async getRatings() {
		let ratings = [];
		try {
			ratings = await movies.distinct('rated');
			return ratings;
		} catch (e) {
			console.error(`unable to get ratings, ${e}`);
			return ratings;
		}
	}

	static async getMovieById(id) {
		try {
			return await movies
				.aggregate([
					{
						$match: {
							_id: new ObjectId(id),
						},
					},
					{
						$lookup: {
							from: 'reviews', //collection to join
							localField: '_id',
							foreignField: 'movie_id',
							as: 'reviews', //output array field
						},
					},
				])
				.next();
		} catch (e) {
			console.error(`something went wrong with getMovieById: ${e}`);
			throw e;
		}
	}
}
