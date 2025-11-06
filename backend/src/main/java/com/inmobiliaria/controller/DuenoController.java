package com.inmobiliaria.controller;

import com.inmobiliaria.model.Dueno;
import com.inmobiliaria.model.PersonaFisica;
import com.inmobiliaria.model.PersonaJuridica;
import com.inmobiliaria.service.DuenoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

// Controlador REST para dueños
@RestController
@RequestMapping("/api/duenos")
@CrossOrigin(origins = "*")
public class DuenoController {

    private final DuenoService service;

    public DuenoController(DuenoService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<Dueno>> getAll() { return ResponseEntity.ok(service.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<Dueno> getById(@PathVariable Long id) { return ResponseEntity.ok(service.findById(id)); }

    @PostMapping
    public ResponseEntity<Dueno> create(@RequestBody Map<String, Object> payload) {
        String tipo = String.valueOf(payload.get("tipo")).toUpperCase();
        if ("FISICO".equals(tipo)) {
            PersonaFisica pf = new PersonaFisica();
            pf.setNombre((String) payload.get("nombre"));
            pf.setApellido((String) payload.get("apellido"));
            pf.setDni((String) payload.get("dni"));
            pf.setEmail((String) payload.get("email"));
            pf.setTelefono((String) payload.get("telefono"));
            return ResponseEntity.ok(service.save(pf));
        } else if ("JURIDICO".equals(tipo)) {
            PersonaJuridica pj = new PersonaJuridica();
            pj.setRazonSocial((String) payload.get("razon_social"));
            pj.setCuit((String) payload.get("cuit"));
            pj.setEmail((String) payload.get("email"));
            pj.setTelefono((String) payload.get("telefono"));
            return ResponseEntity.ok(service.save(pj));
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dueno> update(@PathVariable Long id, @RequestBody Map<String, Object> payload) {
        String tipo = String.valueOf(payload.get("tipo")).toUpperCase();
        if ("FISICO".equals(tipo)) {
            PersonaFisica pf = new PersonaFisica();
            pf.setIdDueno(id);
            pf.setNombre((String) payload.get("nombre"));
            pf.setApellido((String) payload.get("apellido"));
            pf.setDni((String) payload.get("dni"));
            pf.setEmail((String) payload.get("email"));
            pf.setTelefono((String) payload.get("telefono"));
            return ResponseEntity.ok(service.save(pf));
        } else if ("JURIDICO".equals(tipo)) {
            PersonaJuridica pj = new PersonaJuridica();
            pj.setIdDueno(id);
            pj.setRazonSocial((String) payload.get("razon_social"));
            pj.setCuit((String) payload.get("cuit"));
            pj.setEmail((String) payload.get("email"));
            pj.setTelefono((String) payload.get("telefono"));
            return ResponseEntity.ok(service.save(pj));
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { service.delete(id); return ResponseEntity.noContent().build(); }
}