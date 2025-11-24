import React, { useState } from "react";
import { Button, TextField, MenuItem, Box, Typography } from "@mui/material";
import anuncioService from "../api/anuncioService";

// Formulario para crear o editar un anuncio
const AnuncioForm = ({ onSuccess }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    id_propiedad: "",
    tipo_anuncio: "VENTA",
    precio_anuncio: "",
  });

  // Maneja los cambios de los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envía los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await anuncioService.create(formData);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error al crear anuncio:", error);
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
        maxWidth: 480,
      }}
    >
      <Typography variant="h6" color="primary" gutterBottom>
        Crear Anuncio
      </Typography>

      <TextField
        label="ID Propiedad"
        name="id_propiedad"
        value={formData.id_propiedad}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />

      <TextField
        select
        label="Tipo de anuncio"
        name="tipo_anuncio"
        value={formData.tipo_anuncio}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="VENTA">Venta</MenuItem>
        <MenuItem value="ALQUILER">Alquiler</MenuItem>
      </TextField>

      <TextField
        label="Precio"
        name="precio_anuncio"
        type="number"
        value={formData.precio_anuncio}
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
        Publicar
      </Button>
    </Box>
  );
};

export default AnuncioForm;
