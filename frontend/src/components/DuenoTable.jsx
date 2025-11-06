import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// Tabla para listar dueños
const DuenoTable = ({ items = [], onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Nombre/Razón Social</TableCell>
            <TableCell>DNI/CUIT</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.tipo}</TableCell>
              <TableCell>
                {row.nombre || row.razonSocial || row.razon_social || "-"}
              </TableCell>
              <TableCell>{row.dni || row.cuit || "-"}</TableCell>

              {/* Campos opcionales si existen en el backend en el futuro */}
              <TableCell>{row.email || "-"}</TableCell>
              <TableCell>{row.telefono || "-"}</TableCell>
              <TableCell align="right">
                <div className="table-actions">
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

export default DuenoTable;
