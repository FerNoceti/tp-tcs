import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Grid, Button, Divider, CircularProgress } from "@mui/material";
import propiedadService from "../api/propiedadService";

const PropiedadDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [propiedad, setPropiedad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        const res = await propiedadService.getById(id);
        setPropiedad(res.data);
      } catch (err) {
        setError("No se pudo cargar la propiedad");
      } finally {
        setLoading(false);
      }
    };
    fetchPropiedad();
  }, [id]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  if (error) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;
  if (!propiedad) return <Typography sx={{ mt: 4, textAlign: 'center' }}>Propiedad no encontrada</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Button onClick={() => navigate("/propiedades")} sx={{ mb: 2 }}>
        &larr; Volver a Propiedades
      </Button>
      
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Detalle de Propiedad #{propiedad.id}
        </Typography>
        
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Información General</Typography>
            <Typography><strong>Tipo:</strong> {propiedad.tipo_propiedad || propiedad.tipoPropiedad || "-"}</Typography>
            <Typography><strong>Superficie:</strong> {propiedad.superficie} m²</Typography>
            <Typography><strong>Ambientes:</strong> {propiedad.ambientes}</Typography>
            <Typography><strong>Dormitorios:</strong> {propiedad.dormitorios}</Typography>
            <Typography><strong>Baños:</strong> {propiedad.banos}</Typography>
            <Typography><strong>Cocheras:</strong> {propiedad.cocheras}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Dirección</Typography>
            {propiedad.direccion ? (
              <>
                <Typography><strong>Calle:</strong> {propiedad.direccion.calle} {propiedad.direccion.numero}</Typography>
                <Typography><strong>Ciudad:</strong> {propiedad.direccion.ciudad}</Typography>
                <Typography><strong>Provincia:</strong> {propiedad.direccion.provincia}</Typography>
                <Typography><strong>CP:</strong> {propiedad.direccion.codigo_postal || propiedad.direccion.codigoPostal}</Typography>
              </>
            ) : (
              <Typography color="text.secondary">Sin dirección registrada</Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Dueño</Typography>
            {propiedad.dueno ? (
              <>
                <Typography><strong>Nombre:</strong> {propiedad.dueno.nombre} {propiedad.dueno.apellido}</Typography>
                <Typography><strong>Email:</strong> {propiedad.dueno.email}</Typography>
                <Typography><strong>Teléfono:</strong> {propiedad.dueno.telefono}</Typography>
                {propiedad.dueno.razon_social && (
                   <Typography><strong>Razón Social:</strong> {propiedad.dueno.razon_social}</Typography>
                )}
              </>
            ) : (
              <Typography color="text.secondary">Sin dueño asignado</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PropiedadDetalle;
