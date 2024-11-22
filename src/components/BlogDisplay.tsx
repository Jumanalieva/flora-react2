import React, { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa'; // Import Play and Pause icons from React Icons

interface BlogData {
    id: number;
    title: string;
    short_description: string;
    questions: string[];
    answers: string[];
    images?: string[];
    videos?: string[];
}

interface BlogDisplayProps {
    blogData: BlogData;
}

const BlogDisplay: React.FC<BlogDisplayProps> = ({ blogData }) => {
    const [isPlaying, setIsPlaying] = useState(true); // Track play/pause state

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
        <div className="container mx-auto flex flex-col items-center min-h-screen">
            {/* Display Video at the Top */}
            {blogData.videos && blogData.videos.length > 0 && (
                <div className="w-screen h-[40vh] mb-8 relative">
                    {blogData.videos.map((video, index) => (
                        <div key={index} className="relative h-full">
                            {/* Video Element */}
                            <video
                                src={video}
                                autoPlay
                                loop
                                muted
                                className="w-full h-full object-cover"
                            />
                            {/* Play/Pause Button */}
                            <button
                                className="absolute bottom-2 right-2 bg-opacity-50 text-white p-3  flex items-center justify-center"
                                onClick={handleVideoToggle}
                            >
                                {isPlaying ? <FaPause size={10} /> : <FaPlay size={10} />}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Centered Blog Content */}
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg">
                {/* Blog Title */}
                <h1
                    className="text-5xl text-center"
                    style={{
                        fontFamily: '"Playfair Display", serif',
                        marginBottom: '2rem',
                        fontSize: '2.5rem',
                    }}
                >
                    {blogData.title}
                </h1>

                {/* Blog Short Description */}
                <p className="text-lg mb-4 leading-relaxed font-regular">{blogData.short_description}</p>

                {/* First Image Below Short Description */}
                {blogData.images && blogData.images[0] && (
                    <div className="my-6">
                        <img
                            src={blogData.images[0]}
                            alt="Main blog image"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                {/* Blog Questions with Corresponding Answers and Images */}
                <div className="space-y-10">
                    {blogData.questions.map((question, index) => (
                        <div key={index} className="mb-10">
                            <h2 className="font-medium text-xl mb-2 font-playfair text-black">{question}</h2>
                            {blogData.answers[index] && (
                                <p className="text-lg leading-relaxed font-regular mb-6">
                                    {blogData.answers[index]}
                                </p>
                            )}
                            {blogData.images && blogData.images[index + 1] && (
                                <div className="my-4">
                                    <img
                                        src={blogData.images[index + 1]}
                                        alt={`Image related to Q&A ${index + 1}`}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogDisplay;
