import { Log } from '../services/loggingService'; // New path
// This is a mock API created for demonstration purposes. In a real application,
// these functions would make network requests (e.g., using fetch or axios) to a live backend.
export const shortenerApi = {
    shortenUrls: async (urls) => {
        Log('info', 'api', `Initiating request to shorten ${urls.length} URL(s).`);

        return new Promise(resolve => {
            setTimeout(() => {
                const results = urls.map(u => ({
                    ...u,
                    shortCode: Math.random().toString(36).substring(2, 8),
                    createdAt: new Date(),
                    expiresAt: new Date(Date.now() + u.validity * 60000),
                    clicks: [],
                }));
                Log('info', 'api', 'Successfully received shortened URL data from backend simulation.');
                resolve({  results });
            }, 500);
        });
    },
    getStats: async () => {
        Log('info', 'api', 'Requesting URL statistics from the backend.');
        return new Promise(resolve => {
            setTimeout(() => {
                Log('info', 'api', 'Successfully retrieved statistics data.');
                // In a real app, you might fetch data from localStorage here as well.
                resolve({ results: [] }); // Simulating an empty initial state
            }, 500);
        });
    },
    getLongUrl: async (shortCode) => {
        Log('info', 'api', `Fetching original URL for redirection using shortcode: ${shortCode}`);
        return new Promise(resolve => {
            setTimeout(() => {
                const longUrl = 'https://www.google.com'; // This is a mocked destination URL.
                Log('info', 'api', `Found matching destination URL for ${shortCode}.`);
                resolve({ longUrl });
            }, 200);
        });
    }
};
