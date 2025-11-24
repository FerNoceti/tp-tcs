import React, { useEffect, useRef, useState } from "react";
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
  const editDialogRef = useRef(null);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({
    tipo_anuncio: "VENTA",
    precio_anuncio: "",
  });

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

  const handleEditOpen = (row) => {
    setEditItem(row);
    setEditData({
      tipo_anuncio: row.tipo_anuncio || "VENTA",
      precio_anuncio: row.precio_anuncio || "",
    });
    setTimeout(() => {
      editDialogRef.current?.showModal();
    }, 0);
  };

  const handleEditClose = () => {
    editDialogRef.current?.close();
    setEditItem(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editItem) return;
    try {
      const payload = {
        ...editItem,
        tipo_anuncio: editData.tipo_anuncio,
        precio_anuncio: parseFloat(editData.precio_anuncio) || 0,
      };
      await anuncioService.update(editItem.id, payload); 
      handleEditClose();
      await loadData();
    } catch (err) {
      console.error("Error al editar anuncio:", err);
      Swal.fire("Error", "No se pudo editar el anuncio", "error");
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
          onEdit={handleEditOpen}
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

      {/* Modal de edición HTML nativo */}
      <dialog
        ref={editDialogRef}
        style={{
          border: "none",
          borderRadius: 8,
          padding: 0,
          width: 400,
          maxWidth: "95vw",
        }}
      >
        <form
          onSubmit={handleEditSave}
          style={{ background: "#fff", padding: 24 }}
        >
          <h3 style={{ marginTop: 0, color: "#1565C0" }}>Editar Anuncio</h3>
          
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Tipo de Anuncio</label>
            <select
              name="tipo_anuncio"
              value={editData.tipo_anuncio}
              onChange={handleEditChange}
              style={{ width: "100%", padding: 8 }}
            >
              <option value="VENTA">Venta</option>
              <option value="ALQUILER">Alquiler</option>
            </select>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Precio</label>
            <input
              type="number"
              name="precio_anuncio"
              value={editData.precio_anuncio}
              onChange={handleEditChange}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24 }}>
            <button
              type="button"
              onClick={handleEditClose}
              style={{ padding: "8px 16px" }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                background: "#1565C0",
                color: "#fff",
                border: "none",
                borderRadius: 4,
              }}
            >
              Guardar
            </button>
          </div>
        </form>
      </dialog>
    </Box>
  );
};

export default Anuncios;
