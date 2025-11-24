import React, { useEffect, useRef, useState } from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Swal from "sweetalert2";
import direccionService from "../api/direccionService";
import DireccionTable from "../components/DireccionTable";
import DireccionForm from "../components/DireccionForm";
import "../styles/EditModal.css";

const Direcciones = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const editDialogRef = useRef(null);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({
    calle: "",
    numero: "",
    ciudad: "",
    provincia: "",
    codigo_postal: "",
  });

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await direccionService.getAll();
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.content)
        ? res.data.content
        : [];
      setItems(data);
    } catch (err) {
      setError("No se pudo cargar direcciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar dirección?",
      text: `Se eliminará la dirección (ID ${id}). Esta acción no se puede deshacer`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!isConfirmed) return;
    try {
      await direccionService.delete(id);
      await loadData();
      await Swal.fire("Eliminado", "La dirección se eliminó correctamente", "success");
    } catch (e) {
      await Swal.fire("Error", "No se pudo eliminar la dirección", "error");
    }
  };

  const handleEditOpen = (row) => {
    setEditItem(row);
    setEditData({
      calle: row.calle || "",
      numero: row.numero || "",
      ciudad: row.ciudad || "",
      provincia: row.provincia || "",
      codigo_postal: row.codigo_postal || "",
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
        calle: editData.calle,
        numero: editData.numero,
        ciudad: editData.ciudad,
        provincia: editData.provincia,
        codigo_postal: editData.codigo_postal,
      };
      await direccionService.updateById(editItem.id, payload);
      handleEditClose();
      await loadData();
    } catch (err) {
      console.error("Error al editar dirección:", err);
      Swal.fire("Error", "No se pudo editar la dirección", "error");
    }
  };

  return (
    <Box>
      <div className="page-header">
        <h1 className="page-title">Direcciones</h1>
        <button className="btn btn-primary" onClick={() => setOpenForm(true)}>Nueva Dirección</button>
      </div>

      {error && (
        <div style={{ color: '#e53935', marginBottom: 8 }}>{error}</div>
      )}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <DireccionTable
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
        <DialogTitle>Nueva Dirección</DialogTitle>
        <DialogContent>
          <DireccionForm
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
      <dialog ref={editDialogRef} className="edit-modal-dialog narrow">
        <form onSubmit={handleEditSave} className="edit-modal-form">
          <h3 className="edit-modal-title">Editar Dirección</h3>
          
          <div className="edit-modal-field">
            <label className="edit-modal-label">Calle</label>
            <input
              type="text"
              name="calle"
              value={editData.calle}
              onChange={handleEditChange}
              className="edit-modal-input"
            />
          </div>
          <div className="edit-modal-field">
            <label className="edit-modal-label">Número</label>
            <input
              type="text"
              name="numero"
              value={editData.numero}
              onChange={handleEditChange}
              className="edit-modal-input"
            />
          </div>
          <div className="edit-modal-field">
            <label className="edit-modal-label">Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={editData.ciudad}
              onChange={handleEditChange}
              className="edit-modal-input"
            />
          </div>
          <div className="edit-modal-field">
            <label className="edit-modal-label">Provincia</label>
            <input
              type="text"
              name="provincia"
              value={editData.provincia}
              onChange={handleEditChange}
              className="edit-modal-input"
            />
          </div>
          <div className="edit-modal-field">
            <label className="edit-modal-label">Código Postal</label>
            <input
              type="text"
              name="codigo_postal"
              value={editData.codigo_postal}
              onChange={handleEditChange}
              className="edit-modal-input"
            />
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

export default Direcciones;
