import axios from 'axios';

function getAll(page = 0) {
	console.log('get all, api call to backend...');
	return axios.get(
		`https://movie-reviews-service.onrender.com/api/v1/movies?page=${page}`
	);
}

function get(id) {
	return axios.get(
		`https://movie-reviews-service.onrender.com/api/v1/movies/id/${id}`
	);
}

function find(query, by = 'title', page = 0) {
	return axios.get(
		`https://movie-reviews-service.onrender.com/api/v1/movies?${by}=${query}&page=${page}`
	);
}

function createReview(data) {
	return axios.post(
		'https://movie-reviews-service.onrender.com/api/v1/movies/review',
		data
	);
}

function updateReview(data) {
	return axios.put(
		'https://movie-reviews-service.onrender.com/api/v1/movies/review',
		data
	);
}

function deleteReview(id, userId) {
	return axios.delete(
		'https://movie-reviews-service.onrender.com/api/v1/movies/review',
		{
			data: { review_id: id, user_id: userId },
		}
	);
}

function getRatings() {
	return axios.get(
		'https://movie-reviews-service.onrender.com/api/v1/movies/ratings'
	);
}

const MovieDataService = {
	getAll,
	get,
	find,
	createReview,
	updateReview,
	deleteReview,
	getRatings,
};

export default MovieDataService;
