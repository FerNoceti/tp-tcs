package com.inmobiliaria.controller;

import com.inmobiliaria.model.Anuncio;
import com.inmobiliaria.service.AnuncioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

// Controlador REST para anuncios
@RestController
@RequestMapping("/api/anuncios")
@CrossOrigin(origins = "*")
public class AnuncioController {

    private final AnuncioService anuncioService;

    public AnuncioController(AnuncioService anuncioService) { this.anuncioService = anuncioService; }

    @GetMapping
    public ResponseEntity<List<Anuncio>> getAll() { return ResponseEntity.ok(anuncioService.findAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<Anuncio> getById(@PathVariable Long id) { return ResponseEntity.ok(anuncioService.findById(id)); }

    @PostMapping
    public ResponseEntity<Anuncio> create(@RequestBody Anuncio anuncio) { return ResponseEntity.ok(anuncioService.save(anuncio)); }

    @PutMapping("/{id}")
    public ResponseEntity<Anuncio> update(@PathVariable Long id, @RequestBody Anuncio anuncio) { return ResponseEntity.ok(anuncioService.update(id, anuncio)); }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { anuncioService.delete(id); return ResponseEntity.noContent().build(); }

    @PostMapping("/{id}/publicar")
    public ResponseEntity<Anuncio> publicar(@PathVariable Long id) { return ResponseEntity.ok(anuncioService.publicar(id)); }

    @PostMapping("/{id}/pausar")
    public ResponseEntity<Anuncio> pausar(@PathVariable Long id) { return ResponseEntity.ok(anuncioService.pausar(id)); }

    @PostMapping("/{id}/finalizar")
    public ResponseEntity<Anuncio> finalizar(@PathVariable Long id) { return ResponseEntity.ok(anuncioService.finalizar(id)); }
}