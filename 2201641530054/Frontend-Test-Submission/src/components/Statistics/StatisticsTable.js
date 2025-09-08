import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';

const StatisticsTable = ({ data }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="statistics table">
                <TableHead>
                    <TableRow>
                        <TableCell>Short URL</TableCell>
                        <TableCell>Original URL</TableCell>
                        <TableCell>Creation Date</TableCell>
                        <TableCell>Expiry Date</TableCell>
                        <TableCell align="right">Total Clicks</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.shortCode}>
                            <TableCell component="th" scope="row">
                                <Link href={`http://localhost:3000/${row.shortCode}`} target="_blank" rel="noopener">
                                    {`http://localhost:3000/${row.shortCode}`}
                                </Link>
                            </TableCell>
                            <TableCell>{row.longUrl}</TableCell>
                            <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{new Date(row.expiresAt).toLocaleString()}</TableCell>
                            <TableCell align="right">{row.clicks.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StatisticsTable;
