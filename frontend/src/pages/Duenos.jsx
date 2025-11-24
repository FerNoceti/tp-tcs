import React, { useEffect, useRef, useState } from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Swal from "sweetalert2";
import duenoService from "../api/duenoService";
import DuenoTable from "../components/DuenoTable";
import DuenoForm from "../components/DuenoForm";
import "../styles/EditModal.css";

const Duenos = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const editDialogRef = useRef(null);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({
    tipo: "FISICO",
    nombre: "",
    apellido: "",
    dni: "",
    razonSocial: "",
    cuit: "",
    email: "",
    telefono: "",
  });

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await duenoService.getAll();
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.content)
        ? res.data.content
        : [];
      setItems(data);
    } catch (err) {
      setError("No se pudo cargar dueños");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleDelete = async (id) => {
    const item = items.find((it) => it.id === id);
    const nombreLabel = item
      ? item.tipo === "FISICO"
        ? [item.nombre, item.apellido].filter(Boolean).join(" ")
        : item.razonSocial || item.razon_social || `Dueño ${id}`
      : `Dueño ${id}`;
    const { isConfirmed } = await Swal.fire({
      title: "¿Eliminar?",
      text: `Se eliminará "${nombreLabel}" (ID ${id}). Esta acción no se puede deshacer`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!isConfirmed) return;
    try {
      await duenoService.delete(id);
      await loadData();
      await Swal.fire("Eliminado", "El registro se eliminó correctamente", "success");
    } catch (e) {
      await Swal.fire("Error", "No se pudo eliminar el registro", "error");
    }
  };

  const handleEditOpen = (row) => {
    setEditItem(row);
    const base = {
      tipo: row.tipo || "FISICO",
      nombre: row.nombre || "",
      apellido: row.apellido || "",
      dni: row.dni || "",
      razonSocial: row.razonSocial || row.razon_social || "",
      cuit: row.cuit || "",
      email: row.email || "",
      telefono: row.telefono || "",
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
      const payload =
        editData.tipo === "FISICO"
          ? {
              tipo: "FISICO",
              nombre: editData.nombre,
              apellido: editData.apellido,
              dni: editData.dni,
              email: editData.email,
              telefono: editData.telefono,
            }
          : {
              tipo: "JURIDICO",
              razon_social: editData.razonSocial,
              cuit: editData.cuit,
              email: editData.email,
              telefono: editData.telefono,
            };
      await duenoService.update(editItem.id, payload);
      handleEditClose();
      await loadData();
    } catch (err) {
      console.error("Error al editar dueño:", err);
    }
  };

  return (
    <Box>
      <div className="page-header">
        <h1 className="page-title">Dueños</h1>
        <button className="btn btn-primary" onClick={() => setOpenForm(true)}>Nuevo Dueño</button>
      </div>

      {error && (
        <div style={{ color: '#e53935', marginBottom: 8 }}>{error}</div>
      )}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <DuenoTable
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
        <DialogTitle>Nuevo Dueño</DialogTitle>
        <DialogContent>
          <DuenoForm
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
      <dialog ref={editDialogRef} className="edit-modal-dialog">
        <form onSubmit={handleEditSave} className="edit-modal-form">
          <h3 className="edit-modal-title">Editar Dueño</h3>
          <div className="edit-modal-field">
            <label className="edit-modal-label">Tipo</label>
            <select
              name="tipo"
              value={editData.tipo}
              onChange={handleEditChange}
              className="edit-modal-select"
            >
              <option value="FISICO">Persona Física</option>
              <option value="JURIDICO">Persona Jurídica</option>
            </select>
          </div>

          {editData.tipo === "FISICO" ? (
            <>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={editData.nombre}
                  onChange={handleEditChange}
                  className="edit-modal-input"
                />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={editData.apellido}
                  onChange={handleEditChange}
                  className="edit-modal-input"
                />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">DNI</label>
                <input
                  type="text"
                  name="dni"
                  value={editData.dni}
                  onChange={handleEditChange}
                  className="edit-modal-input"
                />
              </div>
            </>
          ) : (
            <>
              <div className="edit-modal-field">
                <label className="edit-modal-label">Razón Social</label>
                <input
                  type="text"
                  name="razonSocial"
                  value={editData.razonSocial}
                  onChange={handleEditChange}
                  className="edit-modal-input"
                />
              </div>
              <div className="edit-modal-field">
                <label className="edit-modal-label">CUIT</label>
                <input
                  type="text"
                  name="cuit"
                  value={editData.cuit}
                  onChange={handleEditChange}
                  className="edit-modal-input"
                />
              </div>
            </>
          )}

          <div className="edit-modal-field">
            <label className="edit-modal-label">Email</label>
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
              className="edit-modal-input"
            />
          </div>
          <div className="edit-modal-field">
            <label className="edit-modal-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={editData.telefono}
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

export default Duenos;
