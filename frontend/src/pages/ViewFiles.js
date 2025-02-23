import React, { useState, useEffect } from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container,
    Snackbar, Alert
} from "@mui/material";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/files";

const ViewFiles = () => {
    const [files, setFiles] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                // Fetch list of file metadata objects
                const response = await axios.get(API_BASE_URL);
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchFiles();
    }, []);

    const handleDownload = (fileId,fileName) => {
        const fileIdentifier = fileId + "_" + fileName
        axios({
            url: `${API_BASE_URL}/download/${fileIdentifier}`,
            method: "GET",
            responseType: "blob", // Important for handling binary data
        })
            .then((response) => {
                // Create a URL for the file blob
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName); // Set download attribute with the file name
                document.body.appendChild(link);
                link.click();
                link.remove();

                setSnackbar({ open: true, message: "Download started successfully!", severity: "success" });
            })
            .catch((error) => {
                console.error("Error downloading file:", error);
                setSnackbar({ open: true, message: "Error: File not found or download failed.", severity: "error" });
            });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
                Uploaded Files
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell>Size (bytes)</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Uploaded By</TableCell>
                            <TableCell>Uploaded At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map((file) => (
                            <TableRow key={file.fileId}>
                                <TableCell>{file.fileName}</TableCell>
                                <TableCell>{file.fileSize}</TableCell>
                                <TableCell>{file.fileType}</TableCell>
                                <TableCell>{file.uploadedBy}</TableCell>
                                <TableCell>{new Date(file.uploadedAt).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleDownload(file.fileId,file.fileName)}
                                    >
                                        Download
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ViewFiles;
