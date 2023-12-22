import React from 'react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const ShowAllClass = ({ item }) => {
    const { _id, Title, InstructorName, Thumbnail, Enroll, Seat, Rating: itemRating } = item
    return (
        <div className='' alt="Click for show details">
            <div className="w-auto glass card">
                <Link className='' to={`/allclass/${_id}`}>
                    <figure className='' >
                        <img src={Thumbnail} className='w-full rounded-lg' />
                        {Seat - Enroll == 0 ?
                            <>
                                <p className='absolute bg-purple-600 top-0 left-0 m-2 px-2 text-white rounded-lg'>Not Available</p>
                            </>
                            :
                            <>
                            </>
                        }
                    </figure>
                    <div className='p-2'>
                        <div className=''>
                            <h2 className="text-lg font-bold">{Title}</h2>
                        </div>
                        <p className='text-sm'>Instructor: <span className='font-bold'>{InstructorName}</span></p>
                        <p className='text-sm'>Total Seat : <span className='font-bold'>{Seat}</span></p>
                        <p className='text-sm'>Available Seat : <span className='font-bold'>{Seat - Enroll}</span></p>
                    </div>
                </Link>

                <div className="p-2">
                    <div className="card-actions flex justify-between items-center">
                        <Rating
                            style={{ maxWidth: 100 }}
                            readOnly
                            value={itemRating}
                        />
                        <Button title="ADD TO CART" item={item}></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowAllClass;