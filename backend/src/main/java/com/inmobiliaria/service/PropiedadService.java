package com.inmobiliaria.service;

import com.inmobiliaria.model.Propiedad;
import com.inmobiliaria.model.Dueno;
import com.inmobiliaria.model.Direccion;
import com.inmobiliaria.repository.PropiedadRepository;
import com.inmobiliaria.repository.DuenoRepository;
import com.inmobiliaria.repository.DireccionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

// Lógica de negocio para propiedades
@Service
public class PropiedadService {

    private final PropiedadRepository repository;
    private final DuenoRepository duenoRepository;
    private final DireccionRepository direccionRepository;

    public PropiedadService(PropiedadRepository repository, DuenoRepository duenoRepository, DireccionRepository direccionRepository) { 
        this.repository = repository;
        this.duenoRepository = duenoRepository;
        this.direccionRepository = direccionRepository;
    }

    public List<Propiedad> findAll() { return repository.findAll(); }
    public Propiedad findById(Long id) { return repository.findById(id).orElseThrow(() -> new RuntimeException("Propiedad no encontrada")); }
    
    public Propiedad save(Propiedad p) { 
        // If dueno has an ID, fetch it from database
        if (p.getDueno() != null && p.getDueno().getIdDueno() != null) {
            Dueno dueno = duenoRepository.findById(p.getDueno().getIdDueno())
                .orElseThrow(() -> new RuntimeException("Dueño no encontrado"));
            p.setDueno(dueno);
        }
        
        // If direccion has an ID, fetch it from database
        if (p.getDireccion() != null && p.getDireccion().getIdDireccion() != null) {
            Direccion direccion = direccionRepository.findById(p.getDireccion().getIdDireccion())
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));
            p.setDireccion(direccion);
        }
        
        return repository.save(p); 
    }
    
    public Propiedad update(Long id, Propiedad p) {
        Propiedad ex = findById(id);
        
        // If dueno has an ID, fetch it from database
        if (p.getDueno() != null && p.getDueno().getIdDueno() != null) {
            Dueno dueno = duenoRepository.findById(p.getDueno().getIdDueno())
                .orElseThrow(() -> new RuntimeException("Dueño no encontrado"));
            ex.setDueno(dueno);
        }
        
        // If direccion has an ID, fetch it from database
        if (p.getDireccion() != null && p.getDireccion().getIdDireccion() != null) {
            Direccion direccion = direccionRepository.findById(p.getDireccion().getIdDireccion())
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));
            ex.setDireccion(direccion);
        }
        
        ex.setTipoPropiedad(p.getTipoPropiedad());
        ex.setDormitorios(p.getDormitorios());
        ex.setAmbientes(p.getAmbientes());
        ex.setBanos(p.getBanos());
        ex.setCocheras(p.getCocheras());
        ex.setSuperficie(p.getSuperficie());
        return repository.save(ex);
    }
    public void delete(Long id) { repository.deleteById(id); }
}