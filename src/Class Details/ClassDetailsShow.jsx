import React from 'react';
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css'
import Button from '../Pages/Button/Button';
import ReviewsDetails from './ReviewsDetails';

const ClassDetailsShow = ({ item }) => {

    const { _id, Title, InstructorName, InstructorPhoto, Thumbnail, Enroll, Seat, price, Description, Rating: classRating, Reviews } = item

    return (
        <div className='md:p-5 p-2 pt-20 rounded-lg '>
            <div className="bg-gray-200  bg-opacity-25 p-2 md:p-5 rounded-lg">
                <div className="md:flex md:gap-20 md:flex-col lg:flex-row">
                    <img src={Thumbnail} className="md:w-1/2 rounded-lg shadow-md" />
                    <div className='md:w-1/2'>
                        <div className='flex justify-between md:my-0 my-5'>
                            <h1 className="md:text-4xl text-xl  font-bold">{Title}</h1>
                            <Rating
                                style={{ maxWidth: 100 }}
                                readOnly
                                value={classRating}
                            />
                        </div>
                        <p className="md:py-6 w-full md:my-0 my-5 md:text-xl ">{Description}</p>
                        <p className="md:py-6 w-full md:my-0 my-5 md:text-xl ">Instructor : <span className='font-bold'>{InstructorName}</span></p>
                        <p className='text-lg pt-2'> Price : $ <span className='font-bold text-orange-500'>{price}</span></p>
                        <p className='text-lg pt-2'> Total Seat : <span className='font-bold'>{Seat}</span></p>
                        <p className='text-lg pt-2 pb-2'> Available Seat Seat : <span className='font-bold'>{Seat - Enroll}</span></p>
                        <Button className="" title="Add To Cart" item={item}></Button>

                    </div>
                </div>
                <div className='mt-10 bg-gray-400 shadow-md rounded-lg bg-opacity-25'>
                    <h1 className='text-center w-full bg-gray-500 rounded-t-lg text-xl py-3 bg-opacity-30'>Reviews of <span className='font-bold'>{Title}</span></h1>
                        {
                            Reviews.map((Review, indexOf) => <ReviewsDetails key={indexOf} Review={Review}></ReviewsDetails>)
                        }
                </div>
            </div>
        </div>
    );
};

export default ClassDetailsShow;