import React, { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { getFiles } from "../api/fileApi";

const ViewFiles = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await getFiles();
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchFiles();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
                Uploaded Files
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell>File Size</TableCell>
                            <TableCell>File Type</TableCell>
                            <TableCell>Uploaded By</TableCell>
                            <TableCell>Uploaded At</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map((file) => (
                            <TableRow key={file.fileId}>
                                <TableCell>{file.fileName}</TableCell>
                                <TableCell>{file.fileSize}</TableCell>
                                <TableCell>{file.fileType}</TableCell>
                                <TableCell>{file.uploadedBy}</TableCell>
                                <TableCell>
                                    {new Date(file.uploadedAt).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ViewFiles;
