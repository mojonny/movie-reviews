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
		<div className="p-5 flex-col justify-center">
			<div className=" bg-film bg-contain p-40 pb-64 pt-20 text-purple -mb-60 border-solid border-8 border-pink">
				<div className="text-2xl font-bold bg-none p-5 text-white">
					Looking for a movie?
				</div>
				<div className="text-2xl font-bold bg-none text-white ml-10">
					We can help with that...
				</div>
			</div>
			<div className="-z-10 flex gap-10 items-center max-w-fit p-5 mt-40 rounded-xl shadow-xl -translate-y-40 bg-purple m-auto">
				<div>
					<div className="text-3xl text-green p-2 font-bold">
						Search by title
					</div>
					<div className="flex justify-center space-x-2">
						<input
							type="text"
							placeholder="Search by title"
							value={searchTitle}
							onChange={onChangeSearchTitle}
							className="text-lg bg-green p-2 rounded-md shadow-lg w-full placeholder:text-purple"
						/>
						<button
							type="button"
							onClick={findByTitle}
							className=" justify-center gap-x-1.5 rounded-md p-1 text-md text-green bg-dark-green font-semibold shadow-sm hover:bg-pink hover:text-purple "
						>
							Search
						</button>
					</div>
				</div>

				<div className="text-lg text-green font-bold">OR</div>
				<div className="flex-col">
					<div className="text-3xl text-green p-2 font-bold">
						Search by rating
					</div>
					<div className="flex justify-center space-x-2">
						<select
							onChange={onChangeSearchRating}
							className="text-lg bg-green p-3 rounded-md shadow-lg w-full focus:outline-none placeholder:text-lg text-purple"
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
							className=" justify-center gap-x-1.5 rounded-md p-1 text-md text-green bg-dark-green font-semibold shadow-sm hover:bg-pink hover:text-purple "
						>
							Search
						</button>
					</div>
				</div>
			</div>

			<div className="flex flex-wrap gap-10 justify-center">
				{movies.map((movie, index) => {
					return (
						<div
							key={index}
							className="p-5 max-w-md  border-solid rounded-lg border-purple border-3 bg-pink shadow-xl"
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
