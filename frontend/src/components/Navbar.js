import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    FileHub
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/upload">
                        Upload
                    </Button>
                    <Button color="inherit" component={Link} to="/files">
                        View Files
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
