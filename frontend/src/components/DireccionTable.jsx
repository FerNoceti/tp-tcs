import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const DireccionTable = ({ items = [], onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Calle</TableCell>
            <TableCell>Número</TableCell>
            <TableCell>Ciudad</TableCell>
            <TableCell>Provincia</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.calle}</TableCell>
              <TableCell>{row.numero}</TableCell>
              <TableCell>{row.ciudad}</TableCell>
              <TableCell>{row.provincia}</TableCell>
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

export default DireccionTable;
