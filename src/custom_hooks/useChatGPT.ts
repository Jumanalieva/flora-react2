import { useState } from "react";

// Define the return type for the useChatGPT hook
interface UseChatGPTReturn {
    response: string | null;
    loading: boolean;
    error: string | null;
    getAnswer: (query: string) => Promise<void>;
}

export function useChatGPT(): UseChatGPTReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);

    async function getAnswer(query: string) {
        setLoading(true);
        setError(null);
        setResponse(null);

        try {
            // Make a POST request to the Flask API
            const res = await fetch("http://100.26.195.185:5000/api/get_answer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });

            if (!res.ok) {
                throw new Error(`API error: ${res.status} ${res.statusText}`);
            }

            const result = await res.json();

            // Expecting a simplified response from Flask
            if (result.response) {
                setResponse(result.response);
            } else if (result.error) {
                throw new Error(result.error);
            } else {
                throw new Error("Unexpected response format from the server.");
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unknown error occurred while fetching data from ChatGPT."
            );
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return { response, loading, error, getAnswer };
}
