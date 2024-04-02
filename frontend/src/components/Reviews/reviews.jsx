import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../../styles/Review.css";

const Reviews = ({ name, text, rating }) => {
    const [reviews, setReviews] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(0);

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const endpoint = `http://localhost:8080/api/v1/reviews/`;
                const response = await axios.get(endpoint);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching review:', error);
            }
        };
        fetchAllReviews();
    }, [isUpdated]);

    const saveReview = async () => {
        try {
            await axios.post(`http://localhost:8080/api/v1/reviews/`, {
                rating: reviewRating,
                text: reviewText,
            }, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            console.log('Review saved successfully.');
            setIsUpdated(!isUpdated);
            setReviewText("");
            setReviewRating(0);
        } catch (error) {
            console.error('Error saving review:', error);
        }
    };

    return (
        <div className="review">
            <h2>Customer Reviews</h2>
            {reviews.map((review) => (
                <div key={review.id}>
                    <h3>{review.user_name}</h3>
                    <p>{review.text}</p>
                    <p>Rating: {review.rating}</p>
                </div>
            ))}
            <form onSubmit={saveReview}>
                <h2>Оставьте отзыв!</h2>
                <textarea placeholder="Write your review..." value={reviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
                <input type="number" placeholder="Rating (1-5)" value={reviewRating} onChange={(e) => setReviewRating(e.target.value)} />
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
};

export default Reviews;
