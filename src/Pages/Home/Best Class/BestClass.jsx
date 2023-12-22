import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ShowClass from './ShowClass';

const BestClass = () => {
  const [bestClass, setBestClass] = useState([])

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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

  useEffect(() => {
    fetch('https://language-masters-server.vercel.app/allclass')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network Response was no ok')
        }
        return res.json()
      })
      .then(data => setBestClass(data))
  }, [])

  const sortedBestClass = bestClass.sort((a, b) => {

    return b.Rating - a.Rating;
  });

  // Get the top 6 best items from the sorted array.
  const top6BestClass = sortedBestClass.slice(0, 6);

  return (
    <div className='md:px-56 md:pt-24 md:pb-24 justify-center gap-2 bg-purple-200'>
      <h1 className='text-4xl pb-20 font-bold uppercase text-center'>Our Best Classes</h1>
      <Slider className='' {...settings}>
        {top6BestClass.map((item, index) => <ShowClass item={item} key={index}></ShowClass>)}
      </Slider>
    </div>
  );
};

export default BestClass;
