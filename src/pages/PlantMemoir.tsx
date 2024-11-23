import React from 'react';
import BlogDisplay from '../components/BlogDisplay';
import Layout from '../components/Layout';
import { useGetSingleBlogData } from '../custom_hooks/useGetSingleBlogData';

const PlantMemoir: React.FC = () => {
    const { blogData, loading, error } = useGetSingleBlogData(1);

    return (
        <Layout>
            {/* Page Content */}
            <div className="flex-grow pt-20">
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
                {!loading && !error && blogData && (
                    <BlogDisplay blogData={blogData} />
                )}
            </div>
        </Layout>
    );
};

export default PlantMemoir;
