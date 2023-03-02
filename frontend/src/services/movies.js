import axios from 'axios';

export function getAll(page = 0) {
	console.log('####');
	return axios.get(`http://localhost:5000/api/v1/movies?page=${page}`);
}

export function get(id) {
	return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`);
}

export function find(query, by = 'title', page = 0) {
	return axios.get(
		`http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`
	);
}

export function createReview(data) {
	return axios.post('http://localhost:5000/api/v1/movies/review', data);
}

export function updateReview(data) {
	return axios.put('http://localhost:5000/api/v1/movies/review', data);
}

export function deleteReview(id, userId) {
	return axios.delete('http://localhost:5000/api/v1/movies/review', {
		data: { review_id: id, user_id: userId },
	});
}

export function getRatings() {
	return axios.get('http://localhost:5000/api/v1/movies/ratings');
}
// }
// /* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
// export default new MovieDataService();
