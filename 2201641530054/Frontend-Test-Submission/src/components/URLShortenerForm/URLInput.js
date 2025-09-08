import React from 'react';
import { TextField, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const URLInput = ({ index, values, onChange, onRemove, showRemoveButton }) => {
    return (
        <Box display="flex" alignItems="center" gap={2} mb={2}>
            <TextField
                label="Original Long URL"
                variant="outlined"
                fullWidth
                value={values.longUrl}
                onChange={(e) => onChange(index, 'longUrl', e.target.value)}
                required
            />
            <TextField
                label="Custom Shortcode (Optional)"
                variant="outlined"
                sx={{ minWidth: 200 }}
                value={values.customCode}
                onChange={(e) => onChange(index, 'customCode', e.target.value)}
            />
            <TextField
                label="Validity (min)"
                type="number"
                variant="outlined"
                sx={{ width: 150 }}
                value={values.validity}
                onChange={(e) => onChange(index, 'validity', e.target.value)}
                InputProps={{ inputProps: { min: 1 } }}
                defaultValue={30}
            />
            {showRemoveButton && (
                <IconButton aria-label="delete" onClick={onRemove} color="error">
                    <DeleteIcon />
                </IconButton>
            )}
        </Box>
    );
};

export default URLInput;

