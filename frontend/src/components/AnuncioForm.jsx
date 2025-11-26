import React, { useState, useEffect } from "react";
import { Button, TextField, MenuItem, Box, Typography } from "@mui/material";
import anuncioService from "../api/anuncioService";
import propiedadService from "../api/propiedadService";

const AnuncioForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    id_propiedad: "",
    tipo_anuncio: "VENTA",
    precio_anuncio: "",
  });

  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const loadPropiedades = async () => {
      try {
        const res = await propiedadService.getAll();
        setPropiedades(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error al cargar propiedades:", err);
      }
    };
    loadPropiedades();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        propiedad: { id: formData.id_propiedad },
        tipo_anuncio: formData.tipo_anuncio,
        precio_anuncio: parseFloat(formData.precio_anuncio) || 0,
      };
      await anuncioService.create(payload);
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
        select
        label="Propiedad"
        name="id_propiedad"
        value={formData.id_propiedad}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      >
        {propiedades.map((prop) => (
          <MenuItem key={prop.id} value={prop.id}>
            {prop.direccion 
              ? `${prop.direccion.calle} ${prop.direccion.numero}, ${prop.direccion.ciudad} (ID: ${prop.id})` 
              : `Propiedad #${prop.id}`}
          </MenuItem>
        ))}
      </TextField>

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
