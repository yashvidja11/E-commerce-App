import React from 'react';
import Slider from 'react-slick';
import {
    bannerImgOne,
    bannerImgTwo,
    bannerImgThree,
    bannerImgFour,
    bannerImgFive,
} from '../assets/images/index';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        appendDots: (dots: React.ReactNode) => (
            <div className="flex justify-center items-center">{dots}</div>
        ),
        customPaging: (i: number) => (
            <button
                className={`w-3 h-3 rounded-full mx-2 focus:outline-none transition-opacity ${
                    i === 0 ? 'bg-gray-700 opacity-100' : 'bg-gray-300 opacity-60'
                }`}
            ></button>
        ),
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const images = [
        bannerImgOne,
        bannerImgTwo,
        bannerImgThree,
        bannerImgFour,
        bannerImgFive,
    ];

    return (
        <div className="w-full z-0">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image} alt={`Img${index + 1}`} className="w-full h-auto" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
