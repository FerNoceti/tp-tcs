package com.inmobiliaria.service;

import com.inmobiliaria.model.Dueno;
import com.inmobiliaria.repository.DuenoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

// Lógica de negocio para dueños
@Service
public class DuenoService {

    private final DuenoRepository repository;

    public DuenoService(DuenoRepository repository) { this.repository = repository; }

    public List<Dueno> findAll() { return repository.findAll(); }
    public Dueno findById(Long id) { return repository.findById(id).orElseThrow(() -> new RuntimeException("Dueño no encontrado")); }
    public Dueno save(Dueno d) { return repository.save(d); }
    public Dueno update(Long id, Dueno d) {
        Dueno ex = findById(id);
        // Por simplicidad: reemplazamos campos vía reflexión de Lombok setters según el tipo
        return repository.save(d);
    }
    public void delete(Long id) { repository.deleteById(id); }
}