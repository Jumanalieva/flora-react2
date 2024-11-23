import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
    imageUrl: string;
    title: string;
    link: string;
    isMainFeature?: boolean; // Optional prop for main feature styling
}

const Card: React.FC<CardProps> = ({ imageUrl, title, link, isMainFeature = false }) => {
    return (
        <div className={`relative ${isMainFeature ? 'md:col-span-2 h-[70%]' : 'h-[70%]'}`}>
            {/* Image as Background */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
            />

            {/* Overlay with Centered Text */}
            <Link
                to={link}
                className={`absolute inset-0 flex items-center justify-center text-center ${
                    isMainFeature ? 'text-black' : 'text-white'
                } text-xl lg:text-3xl xl:text-3xl p-4 hover:underline bg-black bg-opacity-40`} // Add background color and opacity here
            >
                {title}
            </Link>
        </div>
    );
};

export default Card;
