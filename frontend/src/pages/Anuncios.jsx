import React, { useEffect, useState } from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Swal from "sweetalert2";
import anuncioService from "../api/anuncioService";
import AnuncioTable from "../components/AnuncioTable";
import AnuncioForm from "../components/AnuncioForm";

// Página de Anuncios: lista y acciones
const Anuncios = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await anuncioService.getAll();
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.content)
        ? res.data.content
        : [];
      setItems(data);
    } catch (err) {
      setError("No se pudo cargar anuncios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handlePublish = async (id) => {
    await anuncioService
      .publish(id)
      .then(loadData)
      .catch(() => {});
  };
  const handlePause = async (id) => {
    await anuncioService
      .pause(id)
      .then(loadData)
      .catch(() => {});
  };
  const handleFinalize = async (id) => {
    await anuncioService
      .finalize(id)
      .then(loadData)
      .catch(() => {});
  };
  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar anuncio?",
      text: `Se eliminará el anuncio (ID ${id}). Esta acción no se puede deshacer`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!isConfirmed) return;
    try {
      await anuncioService.delete(id);
      await loadData();
      await Swal.fire("Eliminado", "El anuncio se eliminó correctamente", "success");
    } catch (e) {
      await Swal.fire("Error", "No se pudo eliminar el anuncio", "error");
    }
  };

  return (
    <Box>
      <div className="page-header">
        <h1 className="page-title">Anuncios</h1>
        <button className="btn btn-primary" onClick={() => setOpenForm(true)}>Nuevo Anuncio</button>
      </div>

      {error && (
        <div style={{ color: '#e53935', marginBottom: 8 }}>{error}</div>
      )}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <AnuncioTable
          items={items}
          onPublish={handlePublish}
          onPause={handlePause}
          onFinalize={handleFinalize}
          onDelete={handleDelete}
        />
      )}

      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Nuevo Anuncio</DialogTitle>
        <DialogContent>
          <AnuncioForm
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

export default Anuncios;
