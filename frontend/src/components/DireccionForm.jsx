import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import direccionService from "../api/direccionService";

// Formulario para crear/editar dirección
const DireccionForm = ({ propertyId, onSuccess }) => {
  const [formData, setFormData] = useState({
    calle: "",
    numero: "",
    ciudad: "",
    provincia: "",
    codigo_postal: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (propertyId) {
        await direccionService.update(propertyId, formData);
      } else {
        await direccionService.create(formData);
      }
      onSuccess?.();
    } catch (err) {
      console.error("Error al guardar dirección:", err);
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
        Dirección
      </Typography>
      <TextField
        label="Calle"
        name="calle"
        value={formData.calle}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Número"
        name="numero"
        value={formData.numero}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ciudad"
        name="ciudad"
        value={formData.ciudad}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Provincia"
        name="provincia"
        value={formData.provincia}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Código Postal"
        name="codigo_postal"
        value={formData.codigo_postal}
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

export default DireccionForm;
