import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// Tabla para listar propiedades
const PropiedadTable = ({ items = [], onEdit, onDelete }) => {
  const rows = Array.isArray(items) ? items : [];
  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Dirección</TableCell>
            <TableCell>Dormitorios</TableCell>
            <TableCell>Ambientes</TableCell>
            <TableCell>Superficie</TableCell>
            <TableCell>Dueño</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                {row.direccion
                  ? `${row.direccion.calle} ${row.direccion.numero}`
                  : "-"}
              </TableCell>
              <TableCell>{row.dormitorios}</TableCell>
              <TableCell>{row.ambientes}</TableCell>
              <TableCell>{row.superficie}</TableCell>
              <TableCell>{row.dueno?.id ?? row.dueno_id ?? "-"}</TableCell>
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

export default PropiedadTable;
