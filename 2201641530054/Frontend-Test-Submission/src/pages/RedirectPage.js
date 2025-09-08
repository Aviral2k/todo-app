import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shortenerApi } from '../api/urlApi';
import Logger from '../logger';

const RedirectPage = () => {
    const { shortCode } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        Logger.info('page', `RedirectPage mounted for shortcode: ${shortCode}`);
        const handleRedirect = async () => {
            if (!shortCode) return;

            try {
                // This API call fetches the long URL and the backend logs the click event.
                const response = await shortenerApi.getLongUrl(shortCode);
                const { longUrl } = response.data;
                if (longUrl) {
                    Logger.info('page', `Redirecting ${shortCode} to ${longUrl}.`);
                    window.location.href = longUrl;
                } else {
                    throw new Error('Long URL not found for the given shortcode.');
                }
            } catch (error) {
                Logger.error('page', `Redirection failed for ${shortCode}: ${error.message}`);
                // Redirect to a 'not found' page or the home page as a fallback.
                navigate('/');
            }
        };

        handleRedirect();
    }, [shortCode, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Redirecting...</h2>
            <p>Please wait while we redirect you to your destination.</p>
        </div>
    );
};

export default RedirectPage;
