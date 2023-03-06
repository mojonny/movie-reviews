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
		<div className="bg-gray p-5 flex-col justify-center min-h-screen">
			<div className=" bg-film bg-contain text-purple border-solid border-8 border-pink rounded-xl p-10">
				<div className="text-sm w-fit font-bold bg-pink text-purple rounded-xl px-2 py-2 shadow-lg">
					Looking for a movie?
				</div>
				<div className="ml-16 mt-2 text-sm w-fit font-bold bg-pink text-purple rounded-xl px-2 py-2 shadow-lg">
					We can help with that...
				</div>
			</div>
			<div className="-z-10 gap-2 items-center max-w-fit p-5 mx-auto my-2  rounded-xl shadow-xl bg-purple">
				<div className="flex-col">
					<div className="text-xl text-green w-fit font-bold">
						Search by title
					</div>
					<div className="flex justify-center space-x-2">
						<input
							type="text"
							placeholder="Search by title"
							value={searchTitle}
							onChange={onChangeSearchTitle}
							className="text-sm bg-green w-32 rounded-md shadow-lg placeholder:text-purple"
						/>
						<button
							type="button"
							onClick={findByTitle}
							className=" justify-center gap-x-1.5 rounded-md p-1 text-sm text-green bg-dark-green font-semibold shadow-sm hover:bg-pink hover:text-purple "
						>
							Search
						</button>
					</div>
				</div>

				<div className="text-xs text-green p-2">Or</div>
				<div className="flex-col">
					<div className="text-xl text-green w-fit font-bold">
						Search by rating
					</div>
					<div className="flex justify-center space-x-2">
						<select
							onChange={onChangeSearchRating}
							className="text-sm bg-green w-32 rounded-md shadow-lg placeholder:text-purple"
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
							className=" justify-center gap-x-1.5 rounded-md p-1 text-sm text-green bg-dark-green font-semibold shadow-sm hover:bg-pink hover:text-purple"
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
							className="p-5 h-fit max-w-md border-solid rounded-lg border-purple border-3 bg-pink shadow-xl"
						>
							<div className="text-purple font-extrabold text-center">
								{movie.title}
							</div>
							<img
								src={movie.poster}
								alt="movie poster"
								className="object-contain h-80 rounded-md mx-auto my-3 shadow-xl"
							/>

							<div className="text-xs font-bold">Rating:{movie.rated}</div>
							<div className="text-sm font-serif h-20 py-3 px-3 overflow-scroll my-3 border-2 border-purple rounded-md">
								{movie.plot}
							</div>
							<Link
								className="text-bold bg-dark-green text-white p-3 shadow-lg rounded-lg mx-auto"
								to={'/movies/' + movie._id}
							>
								View Reviews
							</Link>
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
