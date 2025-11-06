import React, { useEffect, useRef, useState } from "react";
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import Swal from "sweetalert2";
import duenoService from "../api/duenoService";
import DuenoTable from "../components/DuenoTable";
import DuenoForm from "../components/DuenoForm";

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
      <dialog
        ref={editDialogRef}
        style={{
          border: "none",
          borderRadius: 8,
          padding: 0,
          width: 520,
          maxWidth: "95vw",
        }}
      >
        <form
          onSubmit={handleEditSave}
          style={{ background: "#fff", padding: 24 }}
        >
          <h3 style={{ marginTop: 0, color: "#1565C0" }}>Editar Dueño</h3>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Tipo</label>
            <select
              name="tipo"
              value={editData.tipo}
              onChange={handleEditChange}
              style={{ width: "100%", padding: 8 }}
            >
              <option value="FISICO">Persona Física</option>
              <option value="JURIDICO">Persona Jurídica</option>
            </select>
          </div>

          {editData.tipo === "FISICO" ? (
            <>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={editData.nombre}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: 8 }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={editData.apellido}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: 8 }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>DNI</label>
                <input
                  type="text"
                  name="dni"
                  value={editData.dni}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: 8 }}
                />
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>
                  Razón Social
                </label>
                <input
                  type="text"
                  name="razonSocial"
                  value={editData.razonSocial}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: 8 }}
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>
                  CUIT
                </label>
                <input
                  type="text"
                  name="cuit"
                  value={editData.cuit}
                  onChange={handleEditChange}
                  style={{ width: "100%", padding: 8 }}
                />
              </div>
            </>
          )}

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Email</label>
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleEditChange}
              style={{ width: "100%", padding: 8 }}
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: "block", marginBottom: 4 }}>
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={editData.telefono}
              onChange={handleEditChange}
              style={{ width: "100%", padding: 8 }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
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

export default Duenos;
