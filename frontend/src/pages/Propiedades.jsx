import React, { useEffect, useRef, useState } from "react";
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
  const editDialogRef = useRef(null);
  const [editItem, setEditItem] = useState(null);
  const [editData, setEditData] = useState({
    tipoPropiedad: "",
    dormitorios: "",
    ambientes: "",
    banos: "",
    cocheras: "",
    superficie: "",
    calle: "",
    numero: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
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
      calle: row.direccion?.calle || "",
      numero: row.direccion?.numero || "",
      ciudad: row.direccion?.ciudad || "",
      provincia: row.direccion?.provincia || "",
      codigo_postal: row.direccion?.codigo_postal || "",
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
        direccion: {
          ...editItem.direccion,
          calle: editData.calle,
          numero: editData.numero,
          ciudad: editData.ciudad,
          provincia: editData.provincia,
          codigo_postal: editData.codigo_postal,
        },
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

      {/* Modal de edición HTML nativo */}
      <dialog
        ref={editDialogRef}
        style={{
          border: "none",
          borderRadius: 8,
          padding: 0,
          width: 600,
          maxWidth: "95vw",
        }}
      >
        <form
          onSubmit={handleEditSave}
          style={{ background: "#fff", padding: 24 }}
        >
          <h3 style={{ marginTop: 0, color: "#1565C0" }}>Editar Propiedad</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Tipo Propiedad</label>
              <input
                type="text"
                name="tipo_propiedad"
                value={editData.tipo_propiedad}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Superficie</label>
              <input
                type="number"
                name="superficie"
                value={editData.superficie}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Ambientes</label>
              <input
                type="number"
                name="ambientes"
                value={editData.ambientes}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Dormitorios</label>
              <input
                type="number"
                name="dormitorios"
                value={editData.dormitorios}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Baños</label>
              <input
                type="number"
                name="banos"
                value={editData.banos}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Cocheras</label>
              <input
                type="number"
                name="cocheras"
                value={editData.cocheras}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
          </div>

          <h4 style={{ marginTop: 16, marginBottom: 8, color: "#1565C0" }}>Dirección</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: "block", marginBottom: 4 }}>Calle</label>
              <input
                type="text"
                name="calle"
                value={editData.calle}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Número</label>
              <input
                type="text"
                name="numero"
                value={editData.numero}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Código Postal</label>
              <input
                type="text"
                name="codigo_postal"
                value={editData.codigo_postal}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Ciudad</label>
              <input
                type="text"
                name="ciudad"
                value={editData.ciudad}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4 }}>Provincia</label>
              <input
                type="text"
                name="provincia"
                value={editData.provincia}
                onChange={handleEditChange}
                style={{ width: "100%", padding: 8 }}
              />
            </div>
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

export default Propiedades;
