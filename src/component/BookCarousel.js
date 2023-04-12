import React from "react";
import { Carousel } from "antd";
import './BookCarousel.css';
export function BookCarousel(){
    const imageStyle={ maxWidth: '100%', maxHeight:600, height: 'auto', margin: '0 auto' };
    const images=[
        <div><img alt={1} src={'/images/carousel/book1.jpg'} style={imageStyle}/></div>,
        <div><img alt={2} src={'/images/carousel/book2.jpg'} style={imageStyle}/></div>,
        <div><img alt={3} src={'/images/carousel/book3.jpg'} style={imageStyle}/></div>,
        <div><img alt={4} src={'/images/carousel/book4.jpg'} style={imageStyle}/></div>,
    ]
    //const requireContext = require.context("/images/carousel/", true, /^\.\/.*\.jpg$/);
    return (
        <Carousel autoplay >
            {images}
        </Carousel>
    )
}