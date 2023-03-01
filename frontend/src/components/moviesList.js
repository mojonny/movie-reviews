import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';

export default function MoviesList(props) {
	const [movies, setMovies] = useState([]);
	const [searchTitle, setSearchTitle] = useState('');
	const [searchRating, setSearchRating] = useState('');
	const [ratings, setRatings] = useState(['All Ratings']);

	useEffect(() => {
		retrieveMovies();
		retrieveRatings();
	}, []);

	const retrieveMovies = () => {
		MovieDataService.getAll()
			.then((response) => {
				console.log(response.data);
				setMovies(response.data.movies);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const retrieveRatings = () => {
		MovieDataService.getRatings()
			.then((response) => {
				console.log(response.data);
				setRatings(['All Ratings'].concat(response.data));
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const onChangeSearchTitle = (e) => {
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	};

	const onChangeSearchRating = (e) => {
		const searchRating = e.target.value;
		setSearchRating(searchRating);
	};

	const find = (query, by) => {
		MovieDataService.find(query, by)
			.then((response) => {
				console.log(response.data);
				setMovies(response.data.movies);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const findByTitle = () => {
		find(searchTitle, 'title');
	};

	const findByRating = () => {
		if (searchRating === 'All Ratings') {
			retrieveMovies();
		} else {
			find(searchRating, 'rated');
		}
	};

	return (
		<div>
			<div>
				<div>
					<div>
						<div>
							<input
								type="text"
								placeholder="Search by title"
								value={searchTitle}
								onChange={onChangeSearchTitle}
							/>
						</div>

						<button type="button" onClick={findByTitle}>
							Search
						</button>
					</div>
					<div>
						<select onChange={onChangeSearchRating}>
							{ratings.map((rating, index) => {
								return (
									<option key={index} value={rating}>
										{rating}
									</option>
								);
							})}
						</select>
						<button type="button" onClick={findByRating}>
							Search
						</button>
					</div>
				</div>

				<div>
					{movies.map((movie, index) => {
						return (
							<div key={index} style={{ width: '18rem' }}>
								<img src={movie.poster + '/100px180'} alt="movie poster" />
								<div>
									<div>{movie.title}</div>
									<div>Rating:{movie.rated}</div>
									<div>{movie.plot}</div>
									<Link to={'/movies/' + movie._id}>View Reviews</Link>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
