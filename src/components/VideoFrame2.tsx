import React, { useRef, useState, useEffect } from 'react';

interface VideoFrameProps {
    videoUrl: string;
}

const VideoFrame2: React.FC<VideoFrameProps> = ({ videoUrl }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true); // Start with the video playing

    // Toggle play/pause functionality
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

    // Ensure the video auto-plays on load
    useEffect(() => {
        if (videoRef.current && isPlaying) {
            videoRef.current
                .play()
                .catch((err) => console.error('Error playing video:', err));
        }
    }, [isPlaying]);

    return (
        <div className="relative w-full h-[40vh] mt-20 flex items-center justify-center">
            {/* Video Element */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                autoPlay
                muted // Ensure video is muted
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Custom Controls */}
            <div className="absolute bottom-2 right-4 flex space-x-4">
                {/* Play/Pause Button */}
                <button
                    onClick={togglePlayPause}
                    className="text-l text-white px-1 py-1"
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
};

export default VideoFrame2;
