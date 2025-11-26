import React, { useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from "@mui/material";
import duenoService from "../api/duenoService";

const DuenoForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    tipo: "FISICO",
    nombre: "",
    apellido: "",
    dni: "",
    razon_social: "",
    cuit: "",
    email: "",
    telefono: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload =
        formData.tipo === "FISICO"
          ? {
              tipo: "FISICO",
              nombre: formData.nombre,
              apellido: formData.apellido,
              dni: formData.dni,
              email: formData.email,
              telefono: formData.telefono,
            }
          : {
              tipo: "JURIDICO",
              razon_social: formData.razon_social,
              cuit: formData.cuit,
              email: formData.email,
              telefono: formData.telefono,
            };
      await duenoService.create(payload);
      onSuccess?.();
    } catch (err) {
      console.error("Error al crear dueño:", err);
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
        Crear Dueño
      </Typography>
      <TextField
        select
        label="Tipo"
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      >
        <MenuItem value="FISICO">Persona Física</MenuItem>
        <MenuItem value="JURIDICO">Persona Jurídica</MenuItem>
      </TextField>

      {formData.tipo === "FISICO" ? (
        <>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="DNI"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </>
      ) : (
        <>
          <TextField
            label="Razón Social"
            name="razon_social"
            value={formData.razon_social}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CUIT"
            name="cuit"
            value={formData.cuit}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </>
      )}

      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Teléfono"
        name="telefono"
        value={formData.telefono}
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

export default DuenoForm;
