import React from 'react';
import BlogDisplay from '../components/BlogDisplay'; // Adjust if using a specific display component
import Footer from '../components/Footer'; // Replace Layout with Footer
import { useCultureData } from '../custom_hooks/useCultureData'; // Adjusted to use CultureData hook

const IndustryDisplay: React.FC = () => {
    const { cultureData, loading, error } = useCultureData(1); // Fetch culture data with ID 1

    return (
        <div className="flex flex-col min-h-screen">
            {/* Page Content with padding for the navbar */}
            <div className="pt-20 flex-grow">
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">Error: {error}</p>}
                {!loading && !error && cultureData && (
                    <BlogDisplay blogData={cultureData} /> // Use the culture data here
                )}
            </div>
            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default IndustryDisplay;
