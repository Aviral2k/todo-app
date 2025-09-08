/**
 * Sends a log entry to the evaluation service endpoint.
 *
 * @param {string} level The log level ('info', 'warn', 'error', 'debug', 'fatal').
 * @param {string} pkg The frontend package source ('api', 'component', 'page', 'hook', 'state', 'style').
 * @param {string} message The descriptive log message.
 */
export const Log = async (level, pkg, message) => {
    const LOG_API_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';

    try {
        await fetch(LOG_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stack: 'frontend', // Hardcoded for the frontend track
                level: level,
                package: pkg,
                message: message,
            }),
        });
        // The endpoint returns a 200 OK but we don't need to act on the response body.
    } catch (error) {
        // In a real production app, you might have a fallback logging mechanism here.
        // For this test, we suppress the error to prevent it from crashing the app.
        console.error('CRITICAL: Logging middleware failed to send log.', error);
    }
};
