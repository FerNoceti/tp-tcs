package com.inmobiliaria.controller;

import com.inmobiliaria.model.Propiedad;
import com.inmobiliaria.service.PropiedadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Controlador REST para propiedades
@RestController
@RequestMapping("/api/propiedades")
@CrossOrigin(origins = "*")
public class PropiedadController {

    private final PropiedadService service;

    public PropiedadController(PropiedadService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<Propiedad>> getAll() { return ResponseEntity.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<Propiedad> getById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }

    @PostMapping
    public ResponseEntity<Propiedad> create(@RequestBody Propiedad p) { return ResponseEntity.ok(service.save(p)); }

    @PutMapping("/{id}")
    public ResponseEntity<Propiedad> update(@PathVariable Long id, @RequestBody Propiedad p) { return ResponseEntity.ok(service.update(id, p)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}