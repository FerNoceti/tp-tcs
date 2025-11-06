import React, { useEffect, useState } from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Swal from "sweetalert2";
import propiedadService from "../api/propiedadService";
import PropiedadTable from "../components/PropiedadTable";
import PropiedadForm from "../components/PropiedadForm";

const Propiedades = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await propiedadService.getAll();
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.content)
        ? res.data.content
        : [];
      setItems(data);
    } catch (err) {
      setError("No se pudo cargar propiedades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar propiedad?",
      text: `Se eliminará la propiedad (ID ${id}). Esta acción no se puede deshacer`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!isConfirmed) return;
    try {
      await propiedadService.delete(id);
      await loadData();
      await Swal.fire("Eliminado", "La propiedad se eliminó correctamente", "success");
    } catch (e) {
      await Swal.fire("Error", "No se pudo eliminar la propiedad", "error");
    }
  };

  return (
    <Box>
      <div className="page-header">
        <h1 className="page-title">Propiedades</h1>
        <button className="btn btn-primary" onClick={() => setOpenForm(true)}>Nueva Propiedad</button>
      </div>

      {error && (
        <div style={{ color: '#e53935', marginBottom: 8 }}>{error}</div>
      )}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <PropiedadTable items={items} onDelete={handleDelete} />
      )}

      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Nueva Propiedad</DialogTitle>
        <DialogContent>
          <PropiedadForm
            onSuccess={() => {
              setOpenForm(false);
              loadData();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Propiedades;
