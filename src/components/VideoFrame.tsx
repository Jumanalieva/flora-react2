import React, { useRef, useState, useEffect } from 'react';

interface VideoFrameProps {
    videoUrl?: string; // Make videoUrl optional for reusability
}

const VideoFrame: React.FC<VideoFrameProps> = ({ videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true); // Start with the video playing

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch((err) => {
                    console.error('Error resuming video:', err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (videoRef.current && isPlaying) {
            videoRef.current.play().catch((err) => {
                console.error('Error playing video:', err);
            });
        }
    }, [isPlaying]);

    // Return nothing if videoUrl is not provided
    if (!videoUrl) return null;

    return (
        <div className="relative w-full h-[35vh] px-20 flex items-center justify-center">
            {/* Video Element */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                autoPlay
                muted
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Custom Controls */}
            <div className="absolute bottom-3 right-24 flex space-x-4">
                <button onClick={togglePlayPause} className="text-l text-white">
                    {isPlaying ? 'Pause' : '▶️'}
                </button>
            </div>
        </div>
    );
};

export default VideoFrame;
