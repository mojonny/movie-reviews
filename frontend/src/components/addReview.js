import React, { useState } from 'react';
import MovieDataService from '../services/movies';
import { Link, useParams } from 'react-router-dom';

export default function AddReview(props) {
	let editing = false;
	let initialReviewState = '';

	// if (props.location.state && props.location.state.currentReview) {
	// 	editing = true;
	// 	initialReviewState = props.location.state.currentReview.review;
	// }

	const [review, setReview] = useState(initialReviewState); //tracks if submitted
	const [submitted, setSubmitted] = useState(false);

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
			//get existing review
			data.review_id = props.location.state.currentReview.user_id;
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
		<div>
			{submitted ? (
				<div>
					<h4>Review submitted successfully</h4>
					<Link to={'/movies/' + id}>Back to Movie</Link>
				</div>
			) : (
				<div>
					<label>{editing ? 'Edit' : 'Create'} Review</label>
					<input
						type="text"
						required
						value={review}
						onChange={onChangeReview}
					/>
					<button onClick={saveReview}>Submit Review</button>
				</div>
			)}
		</div>
	);
}
