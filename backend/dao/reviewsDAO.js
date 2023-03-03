//We import mongodb so we can get access to the ObjectId
import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
	//connect with mongodb and see if there are any reviews, if not Mongodb will create a new reviews collection
	static async injectDB(conn) {
		if (reviews) {
			return;
		}
		try {
			reviews = await conn
				.db(process.env.MOVIEREVIEWS_NS)
				.collection('reviews');
		} catch (e) {
			console.error(`unable to establish connection handle in reviewDAO: ${e}`);
		}
	}

	static async addReview(movieId, user, review, date) {
		try {
			//first create our document object
			const reviewDoc = {
				name: user.name,
				user_id: user._id,
				date: date,
				review: review,
				//convert the movie_id string into a MongoDB object id
				movie_id: new ObjectId(movieId),
			};
			//Insert the reviewDoc doc object into the reviews collection using the insertOne method
			return await reviews.insertOne(reviewDoc);
		} catch (e) {
			console.error(`Unable to post the review my friend: ${e}`);
			return { error: e };
		}
	}

	static async updateReview(reviewId, userId, review, date) {
		try {
			//first create our document object
			const updateResponse = await reviews.updateOne(
				//When we call this function we use the userID argument first, if it exists, then we update it with the second arg of review and date
				{ user_id: userId, _id: new ObjectId(reviewId) },
				{ $set: { review: review, date: date } }
			);
			//Insert the reviewDoc doc object into the reviews collection using the insertOne method
			return updateResponse;
		} catch (e) {
			console.error(`Unable to update the reviews today: ${e}`);
			return { error: e };
		}
	}

	static async deleteReview(reviewId, userId) {
		try {
			//first look for the review matching the id and user id, if it exists, then delete it
			const deleteResponse = await reviews.deleteOne({
				_id: new ObjectId(reviewId),
				user_id: userId,
			});
			//Insert the reviewDoc doc object into the reviews collection using the insertOne method
			return deleteResponse;
		} catch (e) {
			console.error(`Unable to delete that review right now: ${e}`);
			return { error: e };
		}
	}
}
