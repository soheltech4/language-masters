import React from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'
import { FaUserCircle } from 'react-icons/fa';

const ReviewsDetails = ({ Review }) => {
    const { Name, Image, Rating: ReviewerRating, Comment } = Review
    return (
        <div className='p-2'>
            <div className='p-5 flex gap-5 rounded-lg bg-purple-100 bg-opacity-30 shadow-md'>
                <div className=''>
                    <p><FaUserCircle className='text-5xl ml-4 mb-2 '></FaUserCircle></p>
                    <Rating
                        style={{ maxWidth: 80 }}
                        readOnly
                        value={ReviewerRating}
                    />
                </div>
                <dir className="divider m-0 p-0 divider-horizontal"></dir>
                <div>
                    <h1 className='font-bold text-xl'>{Name}</h1>
                    <h1>Reviews : {Comment}</h1>
                </div>
            </div>
        </div>
    );
};

export default ReviewsDetails;