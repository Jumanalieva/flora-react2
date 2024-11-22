import React from 'react';
import CulinaryDisplay from '../components/CulinaryDisplay'; // Import the CulinaryDisplay component
import Layout from '../components/Layout'; // Import the layout component
import { useCulinaryData } from '../custom_hooks/CulinaryData'; // Hook for fetching culinary data

const CulinaryDisplayPage: React.FC = () => {
    const { culinaryData, loading, error } = useCulinaryData(1); // Fetch culinary data for a specific entry

    return (
        <Layout>
            <div className="relative w-full h-screen overflow-hidden">
                {/* Background Video */}
                {culinaryData && culinaryData.videos && culinaryData.videos.length > 0 && (
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                        src={culinaryData.videos[0]} // Use only the first video as background
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                )}

                {/* Content Section */}
                <div className="relative z-10 w-full h-full bg-black bg-opacity-50 overflow-y-auto">
                    <div className="container mx-auto px-4 pt-20 pb-8">
                        {loading && <p className="text-center text-white">Loading...</p>}
                        {error && <p className="text-center text-red-500">Error: {error}</p>}
                        {!loading && !error && culinaryData && (
                            <CulinaryDisplay culinaryData={culinaryData} /> // Pass the data to CulinaryDisplay
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CulinaryDisplayPage;
