import React, { useEffect, useState } from 'react';
import InstructorShow from './InstructorShow';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Instructor = () => {
    const [Instructors, setInstructors] = useState([])

    useEffect(() => {
        fetch('https://language-masters-server.vercel.app/allinstructor')
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };


    return (
        <div className='md:px-56 md:pt-24 md:pb-24 mt-20 '>
            <p className='text-4xl pb-20 font-bold uppercase text-center'>Our Honored Instructors</p>
            <div className=''>
                <Slider {...settings}>
                    {
                        Instructors.map(teacher => <InstructorShow key={teacher?._id} teacher={teacher}></InstructorShow>)
                    }
                </Slider>
            </div>
        </div>
    );
};

export default Instructor;