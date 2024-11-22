import { useEffect, useState } from 'react';

interface BlogData {
    id: number;
    title: string;
    short_description: string;
    questions: string[];
    answers: string[];
    images: string[]; // Always an array
    videoUrl: string[]; // Always an array
}

export const useGetSingleBlogData = (id: number) => {
    const [blogData, setBlogData] = useState<BlogData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`http://100.26.195.185:5000/api/blogs/${id}`, { signal });

                if (!response.ok) {
                    throw new Error(`Error fetching blog data. Status: ${response.status} - ${response.statusText}`);
                }

                const data: BlogData = await response.json();

                if (!data.title || !Array.isArray(data.questions) || !Array.isArray(data.answers)) {
                    throw new Error('Invalid or incomplete blog data.');
                }

                setBlogData(data);
                console.log(`Fetched Blog Data for ID: ${id}`, data);
            } catch (error) {
                if (error instanceof Error) {
                    if (error.name === 'AbortError') {
                        console.log('Fetch aborted');
                    } else {
                        console.error('Error fetching blog data:', error.message);
                        setError(`Error fetching blog data: ${error.message}`);
                    }
                } else {
                    console.error('Unexpected error', error);
                    setError('An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [id]);

    return { blogData, loading, error };
};
