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

	return (
		<div>
			<div>
				<h1>Movie Details {id}</h1>
				<div>
					<img src={movie.poster} alt="movie poster" />
				</div>
				<div>
					<div>{movie.title}</div>
					<div>{movie.plot}</div>
					{props.user && (
						<Link to={'/movies/' + props.match.params.id + '/review'}>
							Add review
						</Link>
					)}
				</div>
				<div>
					<h2>Reviews</h2>
					<br />
					{movie.reviews.map((review, index) => {
						return (
							<div key={index}>
								<div>
									<h4>{review.name + 'reviewed on ' + review.date}</h4>
									<p>{review.review}</p>
									{props.user && props.user.id === review.user_id && (
										<div>
											<Link
												to={{
													pathname:
														'/movies/' + props.match.params.id + '/review',
													state: { currentReview: review },
												}}
											>
												Edit
											</Link>
											<br />
											<button>Delete</button>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
