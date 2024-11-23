import React from 'react';
import BlogDisplay from '../components/BlogDisplay';
import Layout from '../components/Layout'; // Properly use Layout
import { useCultureData } from '../custom_hooks/useCultureData';

const IndustryDisplay: React.FC = () => {
    const { cultureData, loading, error } = useCultureData(1); // Fetch culture data with ID 1

    return (
        <Layout>
            {/* Page Content */}
            <div className="pt-20 flex-grow">
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
                {!loading && !error && cultureData && (
                    <BlogDisplay blogData={cultureData} /> // Use the culture data here
                )}
            </div>
        </Layout>
    );
};

export default IndustryDisplay;
