import React from 'react';
import BlogDisplay from '../components/BlogDisplay';
import Footer from '../components/Footer'; // Replaced Layout with Footer
import { useGetSingleBlogData } from '../custom_hooks/useGetSingleBlogData';

const PlantMemoir: React.FC = () => {
    const { blogData, loading, error } = useGetSingleBlogData(1);

    return (
        <div className="pt-20 min-h-screen flex flex-col">
            <div className="flex-grow">
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
                {!loading && !error && blogData && (
                    <BlogDisplay blogData={blogData} />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default PlantMemoir;
