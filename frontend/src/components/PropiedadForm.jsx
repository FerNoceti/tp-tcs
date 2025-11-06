import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import propiedadService from "../api/propiedadService";

// Formulario para crear o editar una propiedad
const PropiedadForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    direccion: "",
    dormitorios: "",
    ambientes: "",
    superficie: "",
    dueno_id: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await propiedadService.create(formData);
      onSuccess?.();
    } catch (err) {
      console.error("Error al crear propiedad:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#fff",
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 520,
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom>
        Crear Propiedad
      </Typography>
      <TextField
        label="Dirección"
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Dormitorios"
        name="dormitorios"
        type="number"
        value={formData.dormitorios}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ambientes"
        name="ambientes"
        type="number"
        value={formData.ambientes}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Superficie (m²)"
        name="superficie"
        type="number"
        value={formData.superficie}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="ID Dueño"
        name="dueno_id"
        value={formData.dueno_id}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Guardar
      </Button>
    </Box>
  );
};

export default PropiedadForm;
