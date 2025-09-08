/**
 * Sends a structured log entry to the remote evaluation service.
 * This function now lives inside the /src directory to comply with Create React App rules.
 *
 * @param {string} level The severity of the log ('info', 'warn', 'error', 'debug', 'fatal').
 * @param {string} pkg The frontend package where the log originates ('api', 'component', 'page', etc.).
 * @param {string} message The detailed log message.
 */
export const Log = async (level, pkg, message) => {
    const LOG_API_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';
    const API_AUTH_TOKEN = 'YOUR_BEARER_TOKEN_HERE'; // ** REMEMBER TO ADD YOUR TOKEN **

    try {
        await fetch(LOG_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_AUTH_TOKEN}`,
            },
            body: JSON.stringify({
                stack: 'frontend',
                level: level,
                package: pkg,
                message: message,
            }),
        });
    } catch (error) {
        console.error('CRITICAL: Logging service failed to transmit log.', error);
    }
};
