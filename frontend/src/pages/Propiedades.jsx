import React, { useEffect, useRef, useState } from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Swal from "sweetalert2";
import propiedadService from "../api/propiedadService";
import direccionService from "../api/direccionService";
import PropiedadTable from "../components/PropiedadTable";
import PropiedadForm from "../components/PropiedadForm";
import "../styles/EditModal.css";

const Propiedades = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [direcciones, setDirecciones] = useState([]);
  const editDialogRef = useRef(null);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({
    tipo_propiedad: "",
    dormitorios: "",
    ambientes: "",
    banos: "",
    cocheras: "",
    superficie: "",
    direccion_id: "",
  });

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
    const loadDirecciones = async () => {
      try {
        const res = await direccionService.getAll();
        setDirecciones(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error al cargar direcciones:", err);
      }
    };
    loadDirecciones();
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

  const handleEditOpen = (row) => {
    setEditItem(row);
    const base = {
      tipo_propiedad: row.tipo_propiedad || "",
      dormitorios: row.dormitorios || "",
      ambientes: row.ambientes || "",
      banos: row.banos || "",
      cocheras: row.cocheras || "",
      superficie: row.superficie || "",
      direccion_id: row.direccion?.id || "",
    };
    setEditData(base);
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
        tipo_propiedad: editData.tipo_propiedad,
        dormitorios: parseInt(editData.dormitorios) || 0,
        ambientes: parseInt(editData.ambientes) || 0,
        banos: parseInt(editData.banos) || 0,
        cocheras: parseInt(editData.cocheras) || 0,
        superficie: parseFloat(editData.superficie) || 0.0,
        direccion: { id: editData.direccion_id },
      };
      await propiedadService.update(editItem.id, payload);
      handleEditClose();
      await loadData();
    } catch (err) {
      console.error("Error al editar propiedad:", err);
      Swal.fire("Error", "No se pudo editar la propiedad", "error");
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
        <PropiedadTable
          items={items}
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

      <dialog ref={editDialogRef} className="edit-modal-dialog">
        <form onSubmit={handleEditSave} className="edit-modal-form">
          <h3 className="edit-modal-title">Editar Propiedad</h3>
          
          <div className="edit-modal-grid">
            <div>
              <label className="edit-modal-label">Tipo Propiedad</label>
              <input
                type="text"
                name="tipo_propiedad"
                value={editData.tipo_propiedad}
                onChange={handleEditChange}
                className="edit-modal-input"
              />
            </div>
            <div>
              <label className="edit-modal-label">Superficie</label>
              <input
                type="number"
                name="superficie"
                value={editData.superficie}
                onChange={handleEditChange}
                className="edit-modal-input"
              />
            </div>
            <div>
              <label className="edit-modal-label">Ambientes</label>
              <input
                type="number"
                name="ambientes"
                value={editData.ambientes}
                onChange={handleEditChange}
                className="edit-modal-input"
              />
            </div>
            <div>
              <label className="edit-modal-label">Dormitorios</label>
              <input
                type="number"
                name="dormitorios"
                value={editData.dormitorios}
                onChange={handleEditChange}
                className="edit-modal-input"
              />
            </div>
            <div>
              <label className="edit-modal-label">Baños</label>
              <input
                type="number"
                name="banos"
                value={editData.banos}
                onChange={handleEditChange}
                className="edit-modal-input"
              />
            </div>
            <div>
              <label className="edit-modal-label">Cocheras</label>
              <input
                type="number"
                name="cocheras"
                value={editData.cocheras}
                onChange={handleEditChange}
                className="edit-modal-input"
              />
            </div>
          </div>

          <h4 className="edit-modal-subtitle">Dirección</h4>
          <div className="edit-modal-grid">
            <div className="edit-modal-grid-full">
              <label className="edit-modal-label">Seleccionar Dirección</label>
              <select
                name="direccion_id"
                value={editData.direccion_id}
                onChange={handleEditChange}
                className="edit-modal-input"
                required
              >
                <option value="">-- Seleccione una dirección --</option>
                {direcciones.map((dir) => (
                  <option key={dir.id} value={dir.id}>
                    {dir.calle} {dir.numero}, {dir.ciudad}, {dir.provincia}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="edit-modal-actions">
            <button
              type="button"
              onClick={handleEditClose}
              className="edit-modal-btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="edit-modal-btn-save"
            >
              Guardar
            </button>
          </div>
        </form>
      </dialog>
    </Box>
  );
};

export default Propiedades;
