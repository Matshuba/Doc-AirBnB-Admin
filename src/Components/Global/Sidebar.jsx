import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { logout } from "../../firebaseConfig"; 
import "./Sidebar.css";

const Item = ({ title, to, icon, selected, setSelected }) => (
  <Box
    className={`menu-item ${selected === title ? "active" : ""}`}
    onClick={() => setSelected(title)}
  >
    <Link to={to} className="menu-item-link">
      <Box display="flex" alignItems="center" gap={1}>
        {icon}
        <Typography className="menu-item-text">{title}</Typography>
      </Box>
    </Link>
  </Box>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate(); 


  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
      {/* Sidebar Header */}
      <Box className="sidebar-header">
        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
          <MenuOutlinedIcon />
        </IconButton>
        {!isCollapsed && (
          <Typography variant="h4" className="sidebar-header-text">
            ADMIN
          </Typography>
        )}
      </Box>

      {/* Admin Info */}
      {!isCollapsed && (
        <Box className="admin-info">
          <Box display="flex" justifyContent="center" alignItems="center">
          </Box>
          <Box mt={1}>
           
            <Typography variant="body2" className="admin-role">
            
            </Typography>
          </Box>
        </Box>
      )}

      {/* Menu Items */}
      <Box className="menu">
        <Item
          title="Dashboard"
          to="/dashboard"
          icon={<HomeOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Add Doctor"
          to="/dashboard/add"
          icon={<PersonAddAltIcon />}
          selected={selected}
          setSelected={setSelected}
        />
        <Item
          title="Manage Doctors"
        to="/dashboard/manage"
        icon={<ManageAccountsIcon />}
        selected={selected}
        setSelected={setSelected}
        />

         <Box
        className="logout-button"
        display="flex"
        alignItems="center"
        gap={0}
        onClick={handleLogout}
      >
        <LogoutIcon />
        {!isCollapsed && <Typography>Logout</Typography>}
      </Box>
      </Box>

      {/* Logout */}
     
    </Box>
  );
};

export default Sidebar;
