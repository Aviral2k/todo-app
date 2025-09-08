import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import URLInput from './URLInput';
import { Log } from '../../services/loggingService';
const Logger = {
    info: (...args) => Log('info', ...args),
    warn: (...args) => Log('warn', ...args),
    error: (...args) => Log('error', ...args),
};

const URLShortenerForm = ({ onSubmit }) => {
    const [urlFields, setUrlFields] = useState([{ id: 1, longUrl: '', customCode: '', validity: 30 }]);

    const handleAddField = () => {
        if (urlFields.length < 5) {
            const newId = urlFields.length > 0 ? Math.max(...urlFields.map(f => f.id)) + 1 : 1;
            setUrlFields([...urlFields, { id: newId, longUrl: '', customCode: '', validity: 30 }]);
            Logger.info('component', 'User added a new URL input field.');
        }
    };

    const handleRemoveField = (id) => {
        setUrlFields(urlFields.filter(field => field.id !== id));
        Logger.info('component', `User removed URL input field with id: ${id}.`);
    };

    const handleChange = (index, field, value) => {
        const newFields = [...urlFields];
        newFields[index][field] = value;
        setUrlFields(newFields);
    };
    
    const handleSubmit = () => {
        // Basic client-side validation
        const isValid = urlFields.every(field => field.longUrl.trim() !== '');
        if (!isValid) {
            Logger.warn('component', 'Form submission blocked due to empty URL field.');
            // Here you would set an error state to show a message to the user
            alert('Please fill in all URL fields before submitting.');
            return;
        }
        onSubmit(urlFields);
    };

    return (
        <Box component="form" noValidate autoComplete="off">
            {urlFields.map((field, index) => (
                <URLInput
                    key={field.id}
                    index={index}
                    values={field}
                    onChange={handleChange}
                    onRemove={() => handleRemoveField(field.id)}
                    showRemoveButton={urlFields.length > 1}
                />
            ))}
            <Box mt={2} display="flex" gap={2}>
                <Button variant="outlined" onClick={handleAddField} disabled={urlFields.length >= 5}>
                    Add another URL
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Shorten URLs
                </Button>
            </Box>
        </Box>
    );
};

export default URLShortenerForm;
