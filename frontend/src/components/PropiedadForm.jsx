import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import propiedadService from "../api/propiedadService";
import direccionService from "../api/direccionService";
import duenoService from "../api/duenoService";

const PropiedadForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    direccion_id: "",
    tipo_propiedad: "",
    dormitorios: "",
    ambientes: "",
    banos: "",
    cocheras: "",
    superficie: "",
    dueno_id: "",
  });

  const [direcciones, setDirecciones] = useState([]);
  const [duenos, setDuenos] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [resDirecciones, resDuenos] = await Promise.all([
          direccionService.getAll(),
          duenoService.getAll(),
        ]);
        setDirecciones(Array.isArray(resDirecciones.data) ? resDirecciones.data : []);
        setDuenos(Array.isArray(resDuenos.data) ? resDuenos.data : []);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedDueno = duenos.find(d => d.id === formData.dueno_id);
      const selectedDireccion = direcciones.find(d => d.id === formData.direccion_id);

      const payload = {
        tipo_propiedad: formData.tipo_propiedad,
        dormitorios: parseInt(formData.dormitorios) || 0,
        ambientes: parseInt(formData.ambientes) || 0,
        banos: parseInt(formData.banos) || 0,
        cocheras: parseInt(formData.cocheras) || 0,
        superficie: parseFloat(formData.superficie) || 0.0,
        dueno: selectedDueno,
        direccion: selectedDireccion,
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

      <TextField
        select
        label="Dirección"
        name="direccion_id"
        value={formData.direccion_id}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      >
        {direcciones.map((dir) => (
          <MenuItem key={dir.id} value={dir.id}>
            {dir.calle} {dir.numero}, {dir.ciudad}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Dueño"
        name="dueno_id"
        value={formData.dueno_id}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      >
        {duenos.map((dueno) => (
          <MenuItem key={dueno.id} value={dueno.id}>
            {dueno.tipo === "FISICO"
              ? `${dueno.nombre} ${dueno.apellido}`
              : dueno.razon_social || dueno.razonSocial}
          </MenuItem>
        ))}
      </TextField>

      <Typography variant="subtitle1" sx={{ mt: 2 }}>Detalles de la Propiedad</Typography>

      <TextField
        label="Tipo de Propiedad"
        name="tipo_propiedad"
        value={formData.tipo_propiedad}
        onChange={handleChange}
        fullWidth
        required
        margin="dense"
        placeholder="Ej: Casa, Departamento, Terreno"
      />

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
        label="Baños"
        name="banos"
        type="number"
        value={formData.banos}
        onChange={handleChange}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Cocheras"
        name="cocheras"
        type="number"
        value={formData.cocheras}
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
