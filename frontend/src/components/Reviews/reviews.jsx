import React from 'react';
import "../../styles/Review.css";

const Review = ({ name, text, rating }) => {
    return (
        <div className="review">
            <h3 className="review__name">{name}</h3>
            <p className="review__text">{text}</p>
            <div className="review__rating">Rating: 5</div>
        </div>
    );
};

const Reviews = () => {
    const reviews = [
        { id: 1, name: 'Alice', text: 'Great service, will come back again!', rating: 4 },
        { id: 2, name: 'Bob', text: 'Best experience ever!', rating: 5 },
        { id: 3, name: 'Charlie', text: 'Good prices, friendly staff.', rating: 4 },
    ];

    return (
        <div className="reviews">
            <h2>Customer Reviews</h2>
            {reviews.map((review) => (
                <Review key={review.id} name={review.name} text={review.text} rating={review.rating} />
            ))}
        </div>
    );
};

export default Reviews;