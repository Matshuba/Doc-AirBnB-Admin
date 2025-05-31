import React from 'react';
import { Box, IconButton } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import './Topbar.css';

const Topbar = () => {
    return (
        <Box className="topbar-container">
            <Box className="topbar-inner">
                <Box className="icons-container">
                    <IconButton className="icon-button">
                        <NotificationsOutlinedIcon />
                    </IconButton>
                    <IconButton className="icon-button">
                        <SettingsOutlinedIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Topbar;
