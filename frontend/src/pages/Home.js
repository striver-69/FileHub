import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to FileHub
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Your central hub for managing files. Use the links below to upload
                    and view files.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/upload"
                    sx={{ m: 1 }}
                >
                    Upload File
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/files"
                    sx={{ m: 1 }}
                >
                    View Files
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
