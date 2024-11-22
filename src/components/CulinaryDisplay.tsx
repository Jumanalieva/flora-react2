import React from 'react';
import Typography from '@mui/material/Typography';

interface CulinaryData {
    id: number;
    title: string;
    short_description: string;
    questions: string[];
    answers: string[];
    images: string[];
    videos?: string[]; // Optional videos field
}

interface CulinaryDisplayProps {
    culinaryData: CulinaryData | null;
}

const CulinaryDisplay: React.FC<CulinaryDisplayProps> = ({ culinaryData }) => {
    if (!culinaryData) {
        return <p className="text-center text-gray-400">No data found for this culinary post.</p>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-40">
            <div className="max-w-4xl mx-auto">
                {/* Culinary Title */}
                <Typography
                    variant="h4"
                    component="h1"
                    className="text-4xl text-center mb-8 text-gray-200"
                    style={{
                        fontFamily: '"Playfair Display", serif',
                        marginBottom: '2rem',
                        fontSize: '2.5rem',
                    }}
                >
                    {culinaryData.title}
                </Typography>

                {/* Culinary Short Description */}
                <Typography
                    variant="body1"
                    className="text-lg mb-8 leading-relaxed font-regular text-gray-100 text-center"
                >
                    {culinaryData.short_description}
                </Typography>

                {/* Render Only the First Image */}
                <div className="my-6">
                    {culinaryData.images[0] && (
                        <img
                            src={culinaryData.images[0]} // First image
                            alt="Main culinary image"
                            className="w-full h-auto object-cover rounded-lg shadow-sm"
                        />
                    )}
                </div>

                {/* Culinary Questions and Answers */}
                <div className="space-y-10">
                    {culinaryData.questions.map((question, index) => (
                        <div key={index} className="mb-10">
                            {/* Display question */}
                            <Typography
                                variant="h6"
                                component="h2"
                                className="font-medium text-xl mb-2 font-playfair text-gray-100"
                            >
                                {question}
                            </Typography>

                            {/* Display corresponding answer */}
                            {culinaryData.answers[index] && (
                                <Typography
                                    variant="body1"
                                    className="text-lg leading-relaxed font-regular text-gray-100 mb-6"
                                >
                                    {culinaryData.answers[index]}
                                </Typography>
                            )}
                        </div>
                    ))}
                </div>

                {/* Render Second Image in Place of Last Video */}
                {culinaryData.images.length > 1 && (
                    <div className="my-6">
                        <img
                            src={culinaryData.images[1]} // Second image
                            alt="Image replacing the last video"
                            className="w-full h-auto object-cover rounded-lg shadow-sm"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CulinaryDisplay;
