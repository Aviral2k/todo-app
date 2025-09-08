import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import URLShortenerForm from '../components/URLShortenerForm/URLShortenerForm';
import { shortenerApi } from '../api/urlApi';
import { Log } from '../services/loggingService';
/* Replace Logger with Log function */

const ShortenerPage = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        Log('info', 'page', 'ShortenerPage component has successfully mounted.');
    }, []);
    // Replace Logger.info and Logger.error with Log
    const handleShorten = async (urls) => {
        Log('info', 'page', 'User has triggered the URL shortening action.');
       try {
    const response = await shortenerApi.shortenUrls(urls);
    setResults(response.data);
    Log('info', 'state', 'Application state has been updated with new shortened URL results.');
} catch (error) {
    Log('error', 'page', `An error occurred during the URL shortening process: ${error.message}`);
    // In a production application, you would set an error state here to display a message to the user.
}

    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                URL Shortener
            </Typography>
            <URLShortenerForm onSubmit={handleShorten} />
            {results.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h5" component="h2">Generated Links</Typography>
                    {/* A component to display the 'results' array would be rendered here,
                        likely iterating over the data to show each original and shortened URL. */}
                </Box>
            )}
        </Container>
    );
};

export default ShortenerPage;
