import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// Tabla para listar anuncios
const AnuncioTable = ({
  items = [],
  onPublish,
  onPause,
  onFinalize,
  onEdit,
  onDelete,
}) => {
  const rows = Array.isArray(items) ? items : [];
  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Propiedad</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Fecha publicación</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                {row.propiedad?.id ?? row.id_propiedad ?? "-"}
              </TableCell>
              <TableCell>{row.tipo_anuncio}</TableCell>
              <TableCell>{row.estado}</TableCell>
              <TableCell>{row.precio_anuncio}</TableCell>
              <TableCell>{row.fecha_publicacion || "-"}</TableCell>
              <TableCell align="right">
                <div className="table-actions">
                  <button className="btn btn-primary" onClick={() => onPublish?.(row.id)}>Publicar</button>
                  <button className="btn btn-warning" onClick={() => onPause?.(row.id)}>Pausar</button>
                  <button className="btn btn-success" onClick={() => onFinalize?.(row.id)}>Finalizar</button>
                  <button className="btn btn-outline" onClick={() => onEdit?.(row)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => onDelete?.(row.id)}>Eliminar</button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AnuncioTable;
