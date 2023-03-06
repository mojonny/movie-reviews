import React, { useState } from 'react';
import MovieDataService from '../services/movies';
import { Link, useParams, useLocation } from 'react-router-dom';

export default function AddReview(props) {
	let editing = false;
	let initialReviewState = '';

	const [review, setReview] = useState(initialReviewState); //tracks if submitted
	const [submitted, setSubmitted] = useState(false);

	const location = useLocation();
	const state = location.state;

	if (state && state.currentReview) {
		editing = true;
		initialReviewState = state.currentReview;
	}

	const onChangeReview = (e) => {
		const review = e.target.value;
		setReview(review);
	};

	const { id } = useParams();

	const saveReview = () => {
		var data = {
			review: review,
			name: props.user.name,
			user_id: props.user.id,
			movie_id: { id }, //get movie if from the url
		};
		if (editing) {
			//get existing review id
			data.review_id = state.currentReview._id; //review_id is found in reviewsDAO
			MovieDataService.updateReview(data)
				.then((response) => {
					setSubmitted(true);
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			MovieDataService.createReview(data)
				.then((response) => {
					setSubmitted(true);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};
	return (
		<div className="bg-gray h-screen w-screen flex flex-col min-h-screen text-center">
			{submitted ? (
				<div className=" p-6 mx-auto shadow-lg bg-purple text-pink w-80 rounded-xl mt-10">
					<div className="font-bold text-lg p-2 mb-5">
						Review submitted successfully
					</div>
					<Link
						className="text-white p-3 bg-dark-green rounded-lg shadow-lg hover:bg-pink hover:text-purple font-bold"
						to={'/movies/' + id}
					>
						Back to Movie
					</Link>
				</div>
			) : (
				<div>
					<label className="text-lg font-bold">
						{editing ? 'Edit' : 'Create'} Review:{' '}
					</label>
					<input
						type="text"
						required
						value={review}
						onChange={onChangeReview}
						className="text-sm bg-green w-fill p-5 rounded-md shadow-lg placeholder:text-purple my-10"
					/>
					<button
						className="bg-dark-green text-white ml-3 shadow-xl p-3 rounded-lg hover:bg-pink hover:text-purple"
						onClick={saveReview}
					>
						{' '}
						Submit Review{' '}
					</button>
				</div>
			)}
		</div>
	);
}
