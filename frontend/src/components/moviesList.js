/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';

export default function MoviesList() {
	const [movies, setMovies] = useState([]);
	const [searchTitle, setSearchTitle] = useState('');
	const [searchRating, setSearchRating] = useState('');
	const [ratings, setRatings] = useState(['All Ratings']);

	const [currentPage, setCurrentPage] = useState(0);
	const [entriesPerPage, setEntriesPerPage] = useState(0);
	const [currentSearchMode, setCurrentSearchMode] = useState('');

	const retrieveMovies = () => {
		setCurrentSearchMode('');
		MovieDataService.getAll(currentPage)
			.then((response) => {
				setMovies(response.data.movies);
				setCurrentPage(response.data.page);
				setEntriesPerPage(response.data.entries_per_page);
			})
			.catch((e) => {
				console.log(e);
				console.log('retrieve movies error/get all');
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
				console.log('retrieve ratings error/get all');
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

	const retrieveNextPage = () => {
		if (currentSearchMode === 'findByTitle') findByTitle();
		else if (currentSearchMode === 'findByRating') findByRating();
		else retrieveMovies();
	};

	const find = (query, by) => {
		MovieDataService.find(query, by, currentPage)
			.then((response) => {
				console.log(response.data);
				setMovies(response.data.movies);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const findByTitle = () => {
		setCurrentSearchMode('findByTitle');
		find(searchTitle, 'title');
	};

	const findByRating = () => {
		setCurrentSearchMode('findByRating');
		if (searchRating === 'All Ratings') {
			retrieveMovies();
		} else {
			find(searchRating, 'rated');
		}
	};

	useEffect(() => {
		setCurrentPage(0);
	}, [currentSearchMode]);

	useEffect(() => {
		retrieveMovies();
		retrieveRatings();
	}, []);

	useEffect(() => {
		retrieveNextPage();
	}, [currentPage]);

	return (
		<div>
			<div
				style={{
					width: '1930px',
				}}
			>
				<div
					style={{
						height: '250px',
						background: '#ffba00',
						border: '2px solid black',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
						justifyContent: 'center',
						alignItems: 'center',
						margin: '10px 20px 20px 10px',
					}}
				>
					<h1>Movie Search!</h1>
					<div
						style={{
							display: 'flex',
							gap: '20px',
							width: '900px',
						}}
					>
						<input
							type="text"
							placeholder="Search by title"
							value={searchTitle}
							onChange={onChangeSearchTitle}
							style={{ width: '500px', height: '30px', padding: '10px' }}
						/>

						<button type="button" onClick={findByTitle}>
							Search
						</button>
					</div>
					<div style={{ display: 'flex', gap: '20px', width: '900px' }}>
						<select
							onChange={onChangeSearchRating}
							style={{ width: '200px', height: '40px', padding: '10px' }}
						>
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

				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						width: '50vw',
						gap: '50px',
						alignItems: 'flex-start',
						marginLeft: '200px',
					}}
				>
					{movies.map((movie, index) => {
						return (
							<div
								key={index}
								style={{
									width: '15rem',
									height: '18rem',
									border: '1px solid #000000',
									borderRadius: '10px',
									padding: '20px',
								}}
							>
								<img
									src={movie.poster}
									alt="movie poster"
									style={{ height: '50px', width: '50px' }}
								/>
								<div>{movie.title}</div>
								<div>Rating:{movie.rated}</div>
								<div>{movie.plot}</div>
								<Link to={'/movies/' + movie._id}>View Reviews</Link>
							</div>
						);
					})}
				</div>
				<br />
				<h3>Showing page: {currentPage}</h3>
				<button
					onClick={() => {
						setCurrentPage(currentPage + 1);
					}}
				>
					Get next {entriesPerPage} results
				</button>
			</div>
		</div>
	);
}
