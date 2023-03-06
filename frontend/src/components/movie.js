import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link, useParams } from 'react-router-dom';

export default function Movie(props) {
	const { id } = useParams();

	const [movie, setMovie] = useState({
		id: null,
		title: '',
		rated: '',
		reviews: [],
	});

	const getMovie = (id) => {
		MovieDataService.get(id)
			.then((response) => {
				setMovie(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		getMovie(`${id}`);
	}, [id]);

	const deleteReview = (reviewId, index) => {
		MovieDataService.deleteReview(reviewId, props.user.id)
			.then((response) => {
				setMovie((prevState) => {
					prevState.reviews.splice(index, 1);
					return {
						...prevState,
					};
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};
	return (
		<div className="flex flex-col items-center gap-1 bg-gray min-h-screen pb-10">
			<div className="text-purple font-semibold text-2xl p-3">
				Movie Details
			</div>
			<div className="text-purple text-lg font-sans m-0">{movie.title}</div>
			<div>
				<img
					className="rounded-lg object-contain w-60"
					src={movie.poster}
					alt="movie poster"
				/>
			</div>
			<div className="flex flex-col justify-center">
				<div className=" p-5 min-w-fit overflow-visible mb-3">{movie.plot}</div>
				{props.user && (
					<Link
						className="bg-dark-green text-white mx-auto shadow-xl p-3 rounded-lg hover:bg-pink hover:text-purple"
						to={'/movies/' + id + '/review'}
					>
						Add review
					</Link>
				)}
			</div>
			<div>
				<div className="p-2 my-10 w-screen text-center text-pink bg-purple border-y-4 border-pink">
					Reviews
				</div>
				{movie.reviews.map((review, index) => {
					return (
						<div key={index}>
							<div className="bg-purple text-pink rounded-xl p-2 mx-10  my-2 min-w-196">
								<div className="text-lg font-bold min-w-fit overflow-visible mb-1">
									{review.name}
								</div>
								<div className="min-w-fit overflow-visible mb-1">
									{review.review}
								</div>
							</div>
							{props.user && props.user.id === review.user_id && (
								<div className="flex">
									<Link
										to={'/movies/' + id + '/review'}
										state={{ currentReview: review }}
										className="bg-dark-green text-white mx-auto shadow-xl p-3 rounded-lg hover:bg-pink hover:text-purple"
									>
										Edit
									</Link>
									<br />
									<button
										className="bg-dark-green text-white mx-auto shadow-xl p-3 rounded-lg hover:bg-pink hover:text-purple"
										onClick={() => deleteReview(review._id, index)}
									>
										Delete
									</button>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
