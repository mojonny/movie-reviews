/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import '../index.css';

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
		<div className="bg-emerald-700 p-5">
			<h1 className="m-10 text-4xl text-blue-200 underline first-letter:text-9xl font-bold p-5 bg-blue-600 border-8 border-blue-900 rounded-2xl shadow-lg">
				Movie Search!
			</h1>

			<div className="flex-col justify-center bg-blue-900 border-solid border-blue-600 max-h-full rounded-lg shadow-xl space-y-10 p-5 mx-10 my-20">
				<div className="text-3xl text-blue-100 font-bold"> Search by title</div>
				<div className="flex justify-center space-x-5">
					<input
						type="text"
						placeholder="Search by title"
						value={searchTitle}
						onChange={onChangeSearchTitle}
						className="p-5 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-96"
					/>
					<button
						type="button"
						onClick={findByTitle}
						className=" justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-800 hover:text-slate-200"
					>
						Search
					</button>
				</div>

				<div className="text-xl text-blue-100 font-bold"> -- OR --</div>

				<div className="text-3xl text-blue-100 font-bold">
					{' '}
					Search by rating
				</div>
				<div className="flex justify-center space-x-5">
					<select
						onChange={onChangeSearchRating}
						className="w-96 p-5 rounded-md bg-white shadow-lg "
					>
						{ratings.map((rating, index) => {
							return (
								<option key={index} value={rating}>
									{rating}
								</option>
							);
						})}
					</select>
					<button
						type="button"
						onClick={findByRating}
						className=" justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-800 hover:text-slate-200"
					>
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
	);
}
