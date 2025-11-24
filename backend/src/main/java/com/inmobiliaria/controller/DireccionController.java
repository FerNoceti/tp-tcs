package com.inmobiliaria.controller;

import com.inmobiliaria.model.Direccion;
import com.inmobiliaria.service.DireccionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Controlador REST para direcciones
@RestController
@RequestMapping("/api/direcciones")
@CrossOrigin(origins = "*")
public class DireccionController {

    private final DireccionService service;

    public DireccionController(DireccionService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<Direccion>> getAll() { return ResponseEntity.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<Direccion> getById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }

    @PostMapping
    public ResponseEntity<Direccion> create(@RequestBody Direccion d) { return ResponseEntity.ok(service.save(d)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }

    @PutMapping("/{id}")
    public ResponseEntity<Direccion> update(@PathVariable Long id, @RequestBody Direccion d) { return ResponseEntity.ok(service.update(id, d)); }

    // Endpoints por propiedad (coinciden con el frontend)
    @GetMapping("/propiedades/{idPropiedad}/direccion")
    public ResponseEntity<Direccion> getByProperty(@PathVariable Long idPropiedad) { return ResponseEntity.ok(service.getByProperty(idPropiedad)); }

    @PutMapping("/propiedades/{idPropiedad}/direccion")
    public ResponseEntity<Direccion> updateByProperty(@PathVariable Long idPropiedad, @RequestBody Direccion data) { return ResponseEntity.ok(service.updateByProperty(idPropiedad, data)); }
}