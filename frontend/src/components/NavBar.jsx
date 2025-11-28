import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "../styles/navbar.css";

function NavBar() {
  const linkClassName = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <AppBar position="static" color="primary" className="navbar">
      <Toolbar className="navbar-toolbar">
        <Typography variant="h6" className="navbar-title">
          Sistema Inmobiliario
        </Typography>
        <div className="navbar-links">
          <NavLink to="/" className={linkClassName}>Inicio</NavLink>
          <NavLink to="/anuncios" className={linkClassName}>Anuncios</NavLink>
          <NavLink to="/propiedades" className={linkClassName}>Propiedades</NavLink>
          <NavLink to="/duenos" className={linkClassName}>Dueños</NavLink>
          <NavLink to="/direcciones" className={linkClassName}>Direcciones</NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
