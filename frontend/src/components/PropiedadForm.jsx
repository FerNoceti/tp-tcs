import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import propiedadService from "../api/propiedadService";

// Formulario para crear o editar una propiedad
const PropiedadForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    calle: "",
    numero: "",
    ciudad: "",
    provincia: "",
    codigo_postal: "",
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
      const payload = {
        dormitorios: parseInt(formData.dormitorios) || 0,
        ambientes: parseInt(formData.ambientes) || 0,
        superficie: parseFloat(formData.superficie) || 0.0,
        dueno: { id: formData.dueno_id },
        direccion: {
          calle: formData.calle,
          numero: formData.numero,
          ciudad: formData.ciudad,
          provincia: formData.provincia,
          codigo_postal: formData.codigo_postal,
        },
      };
      await propiedadService.create(payload);
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
      
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Dirección</Typography>
      <TextField
        label="Calle"
        name="calle"
        value={formData.calle}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Número"
        name="numero"
        value={formData.numero}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Ciudad"
        name="ciudad"
        value={formData.ciudad}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Provincia"
        name="provincia"
        value={formData.provincia}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Código Postal"
        name="codigo_postal"
        value={formData.codigo_postal}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />

      <Typography variant="subtitle1" sx={{ mt: 2 }}>Detalles</Typography>
      <TextField
        label="Dormitorios"
        name="dormitorios"
        type="number"
        value={formData.dormitorios}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Ambientes"
        name="ambientes"
        type="number"
        value={formData.ambientes}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Superficie (m²)"
        name="superficie"
        type="number"
        value={formData.superficie}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="ID Dueño"
        name="dueno_id"
        value={formData.dueno_id}
        onChange={handleChange}
        fullWidth
        required
        margin="dense"
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
