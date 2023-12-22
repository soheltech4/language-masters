import React from 'react';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const InstructorDetailsShow = ({ instructor }) => {

    const { bio, email, experience_years, name, phone, photo, rating, _id, courses_taught } = instructor

    return (
        <div className='md:p-5 p-2 pt-10 rounded-lg '>
            <div className="bg-gray-500 p-2 bg-opacity-25 md:p-5 rounded-lg">
                <div className="md:flex md:gap-20 md:flex-col lg:flex-row">
                    <img src={photo} className="md:w-80 rounded-lg shadow-md" />
                    <div className=''>
                        <div className='flex justify-between md:my-0 my-5'>
                            <h1 className="md:text-4xl text-xl  font-bold uppercase">{name}</h1>
                            <div className=''>
                            <Rating
                            style={{ maxWidth: 120 }}
                            readOnly
                            value={rating}
                        />
                            </div>
                        </div>
                        <p className="md:py-2 w-full md:my-0 my-2 md:text-xl ">{bio}</p>
                        <p className="md:py-2 w-full md:my-0 my-2 md:text-xl ">Total Experience : <span className='font-bold'>{experience_years}</span> years</p>
                        <p className="md:py-2 w-full md:my-0 my-2 md:text-xl ">Phone : <span className='font-bold'>{phone}</span></p>
                        <p className="md:py-2 w-full md:my-0 my-2 md:text-xl ">Email : <span className='font-bold'>{email}</span></p>
                        <div className='mt-5 gap-5 md:pt-5'>
                            <h1 className='md:py-2 w-full md:my-0 my-2 md:text-xl font-bold'>Course Taught</h1>
                        {courses_taught.map((course, indexOf) => <li key={indexOf} className='md:text-lg'>{course}</li> )}
                        </div>
                    </div>
                </div>
                <div className='mt-10 bg-gray-500 rounded-lg bg-opacity-25'>
                    
                </div>
            </div>
        </div>
    );
};

export default InstructorDetailsShow;