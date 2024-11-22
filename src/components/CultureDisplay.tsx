import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { FaPlay, FaPause } from 'react-icons/fa';

interface CultureData {
    id: number;
    title: string;
    short_description: string;
    questions: string[];
    answers: string[];
    images?: string[]; // Images array from RDS
    videoUrl?: string[]; // Video URLs array from RDS
}

interface CultureDisplayProps {
    cultureData: CultureData | null; // Accept cultureData as a prop
}

const CultureDisplay: React.FC<CultureDisplayProps> = ({ cultureData }) => {
    const [isPlaying, setIsPlaying] = useState(true); // Track play/pause state

    if (!cultureData) {
        return <p>No data found for this culture post.</p>;
    }

    const handleVideoToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const videoElement = e.currentTarget.previousSibling as HTMLVideoElement;
        if (videoElement.paused) {
            videoElement.play();
            setIsPlaying(true);
        } else {
            videoElement.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="container mt-40 mx-auto px-4">
            {/* Video Section (Only First Video) */}
            {cultureData.videoUrl && cultureData.videoUrl.length > 0 && (
                <div className="w-screen h-[40vh] mb-8 relative">
                    <div className="relative h-full">
                        <video
                            src={cultureData.videoUrl[0]}
                            autoPlay
                            loop
                            muted
                            className="w-full h-full object-cover"
                        />
                        <button
                            className="absolute bottom-2 right-2  text-white p-3  flex items-center justify-center"
                            onClick={handleVideoToggle}
                        >
                            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                        </button>
                    </div>
                </div>
            )}

            {/* Culture Title */}
            <Typography
                variant="h4"
                component="h1"
                className="text-4xl text-center mb-10"
                style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem' }}
            >
                {cultureData.title}
            </Typography>

            {/* Culture Short Description */}
            <Typography
                variant="body1"
                className="text-lg mb-8 leading-relaxed font-regular"
            >
                {cultureData.short_description}
            </Typography>

            {/* Culture Questions with Corresponding Answers and Images */}
            <div className="space-y-10">
                {cultureData.questions.map((question, index) => (
                    <div key={index} className="mb-10">
                        {/* Display Question */}
                        <Typography
                            variant="h6"
                            component="h2"
                            className="font-medium text-xl mb-2 font-playfair text-black"
                        >
                            {question}
                        </Typography>

                        {/* Display Corresponding Answer */}
                        {cultureData.answers[index] && (
                            <Typography
                                variant="body1"
                                className="text-lg leading-relaxed font-regular mb-6"
                            >
                                {cultureData.answers[index]}
                            </Typography>
                        )}

                        {/* Display Corresponding Image Below Answer */}
                        {cultureData.images && cultureData.images[index] && (
                            <div className="my-4">
                                <img
                                    src={cultureData.images[index]}
                                    alt={`Image related to Q&A ${index + 1}`}
                                    className="w-full h-auto object-cover rounded-lg shadow-sm"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CultureDisplay;
