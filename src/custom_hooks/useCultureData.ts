import { useEffect, useState } from 'react';

interface CultureData {
    id: number;
    title: string;
    short_description: string;
    questions: string[];
    answers: string[];
    images?: string[]; // Optional array of image URLs
    videos?: string[]; // Optional array of video URLs
}

export const useCultureData = (
    id: number
): { cultureData: CultureData | null; loading: boolean; error: string | null } => {
    const [cultureData, setCultureData] = useState<CultureData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response: Response = await fetch(`http://100.26.195.185:5000/api/culture/${id}`, { signal });
                if (!response.ok) {
                    throw new Error(`Error fetching the data: ${response.statusText}`);
                }

                const data: CultureData = await response.json();

                // Validate required fields
                if (!data.title || !data.questions || !data.answers) {
                    throw new Error('Missing essential culture data in the API response.');
                }

                // Log fetched data for debugging
                console.log('Fetched Culture Data:', data);

                // Set culture data
                setCultureData(data);
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

        // Cleanup function to abort the fetch request
        return () => {
            controller.abort();
        };
    }, [id]);

    return { cultureData, loading, error };
};
