// src/pages/AI_Botanist.tsx
import React from 'react';
import AIBotanist from '../components/AI_Botanist'; // Ensure this path is correct

const AI_Botanist: React.FC = () => {
  const videoUrl = 'https://s3.us-east-1.amazonaws.com/fflora.com/cinnamon/5D6C055B-325F-492E-B576-2C55222EFA25.mp4'; // Update this path to your actual video file

  return (
    <div className="relative w-full h-screen overflow-y: auto">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={videoUrl}
        autoPlay
        loop
        muted
      />

      {/* Overlay Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        

        {/* AIBotanist Component */}
        <AIBotanist />
      </div>
    </div>
  );
};

export default AI_Botanist;

