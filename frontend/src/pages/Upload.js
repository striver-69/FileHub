import React, { useState } from "react";
import {
    Container,
    Typography,
    Button,
    Box,
    TextField,
    Alert,
} from "@mui/material";
import { uploadFile } from "../api/fileApi";

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedBy, setUploadedBy] = useState("");
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile || !uploadedBy) {
            setMessage("Please select a file and enter your user ID.");
            return;
        }
        try {
            await uploadFile(selectedFile, uploadedBy);
            setMessage("File uploaded successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("File upload failed!");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Upload File
                </Typography>
                <TextField
                    label="Uploaded By (User ID)"
                    variant="outlined"
                    fullWidth
                    value={uploadedBy}
                    onChange={(e) => setUploadedBy(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" component="label" sx={{ mb: 2 }}>
                    Select File
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {selectedFile && (
                    <Typography variant="body1" gutterBottom>
                        Selected File: {selectedFile.name}
                    </Typography>
                )}
                <Button variant="contained" color="primary" onClick={handleUpload}>
                    Upload
                </Button>
                {message && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                        {message}
                    </Alert>
                )}
            </Box>
        </Container>
    );
};

export default Upload;
