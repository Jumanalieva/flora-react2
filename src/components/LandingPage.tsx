

import React, { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa'; // Import Play and Pause icons
import FloraInsight from '../components/FloraInsight';
import Card from '../components/Card';
import Footer from '../components/Footer'; 

const LandingPage: React.FC = () => {
  // Replace these URLs with actual S3 media URLs
  const s3VideoUrl = 'https://s3.us-east-1.amazonaws.com/fflora.com/landing-page/f_field.mp4';
  const s3ImageUrls = [
    'https://s3.us-east-1.amazonaws.com/fflora.com/landing-page/82EED758-06BE-4A34-B1F9-1D860357B24D_1_201_a.jpeg',
    'https://s3.us-east-1.amazonaws.com/fflora.com/landing-page/pexels-olga-volkovitskaia-131638009-28929609.jpeg',
    'https://s3.us-east-1.amazonaws.com/fflora.com/landing-page/0B52F78D-EB47-4E30-9AE4-11063656E41E_1_201_a.jpeg',
    'https://s3.us-east-1.amazonaws.com/fflora.com/landing-page/pexels-valeriya-9957552.jpeg'
  ];

  const [isPlaying, setIsPlaying] = useState(true); // State to track play/pause

  const handlePlayPause = (videoElement: HTMLVideoElement | null) => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
        setIsPlaying(false);
      } else {
        videoElement.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="mt-40 flex flex-col min-h-screen">
      {/* Video Section */}
      <div className="relative w-screen h-[45vh] mb-5">
        <video
          id="landing-page-video"
          src={s3VideoUrl}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
        {/* Play/Pause Button */}
        <button
          className="absolute bottom-2 right-2 bg-opacity-50 text-white p-3 flex items-center justify-center"
          onClick={() =>
            handlePlayPause(document.getElementById('landing-page-video') as HTMLVideoElement)
          }
        >
          {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
        </button>
      </div>

      {/* FloraInsight Text Section */}
      <div className="m-5 text-center px-4">
        <FloraInsight text="Glimpse into the soul of flora around us - A gentle touch of beauty and the quiet voice of wisdom" />
      </div>

      {/* Featured Section */}
      <div className=" mx-auto font-playfair flex-grow px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Two Cards in First Row */}
          <Card
            imageUrl={s3ImageUrls[0]}
            title="Story of the day"
            link="/plant"
          />
          <Card
            imageUrl={s3ImageUrls[1]}
            title="Fall-Winter recipes from us"
            link="/culinary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Two Cards in Second Row */}
          <Card
            imageUrl={s3ImageUrls[2]}
            title="Discover more resources"
            link="/botanistAI"
          />
          <Card
            imageUrl={s3ImageUrls[3]}
            title="The Art of Crafting Spicy Scents"
            link="/industry"
          />
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LandingPage;
