import React, { useState } from "react";
import {
    Container,
    Typography,
    Button,
    Box,
    TextField,
    Alert,
    Grid
} from "@mui/material";
import { uploadFile } from "../api/fileApi";

const allowedFileTypes = ["txt", "jpg", "jpeg", "png", "json"];

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedBy, setUploadedBy] = useState("");
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (!allowedFileTypes.includes(fileExtension)) {
                setMessage(`Invalid file type! Only ${allowedFileTypes.join(", ")} are allowed.`);
                setSelectedFile(null);
            } else {
                setMessage("");
                setSelectedFile(file);
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !uploadedBy) {
            setMessage("Please select a valid file and enter your user ID.");
            return;
        }
        try {
            await uploadFile(selectedFile, uploadedBy);
            setMessage("File uploaded successfully!");
            setSelectedFile(null);
            setUploadedBy("");
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
                <Grid container spacing={2}>
                    {/* User ID Field */}
                    <Grid item xs={12}>
                        <TextField
                            label="Uploaded By (User ID)"
                            variant="outlined"
                            fullWidth
                            value={uploadedBy}
                            onChange={(e) => setUploadedBy(e.target.value)}
                        />
                    </Grid>

                    {/* Select File Button */}
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            sx={{ height: "56px" }}  // Matches TextField height
                        >
                            Select File
                            <input
                                type="file"
                                hidden
                                onChange={handleFileChange}
                                accept=".txt,.jpg,.jpeg,.png,.json"
                            />
                        </Button>
                    </Grid>

                    {/* Upload Button */}
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpload}
                            fullWidth
                            sx={{ height: "56px" }}
                            disabled={!selectedFile}
                        >
                            Upload
                        </Button>
                    </Grid>
                </Grid>

                {/* Display Selected File */}
                {selectedFile && (
                    <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                        Selected File: {selectedFile.name}
                    </Typography>
                )}

                {/* Message Alert */}
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
