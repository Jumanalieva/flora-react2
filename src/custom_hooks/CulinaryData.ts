import { useEffect, useState } from 'react';

interface CulinaryData {
    id: number;
    title: string;
    short_description: string;
    questions: string[];
    answers: string[];
    images: string[]; // Added array for images
    videos: string[]; // Added array for videos
}

export const useCulinaryData = (
    id: number
): { culinaryData: CulinaryData | null; loading: boolean; error: string | null } => {
    const [culinaryData, setCulinaryData] = useState<CulinaryData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response: Response = await fetch(`http://100.26.195.185:5000/api/culinary/${id}`, { signal });
                if (!response.ok) {
                    throw new Error(`Error fetching the data: ${response.statusText}`);
                }
                const data: CulinaryData = await response.json();
                setCulinaryData(data);
                console.log('Fetched Culinary Data:', data); // Log fetched data
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    const errorMessage = `Error fetching the data: ${(err as Error).message}`;
                    setError(errorMessage);
                    console.error(errorMessage);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function to abort fetch if component unmounts
        return () => {
            controller.abort();
        };
    }, [id]);

    return { culinaryData, loading, error };
};
