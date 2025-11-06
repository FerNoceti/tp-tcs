package com.inmobiliaria.service;

import com.inmobiliaria.model.Propiedad;
import com.inmobiliaria.repository.PropiedadRepository;
import org.springframework.stereotype.Service;
import java.util.List;

// Lógica de negocio para propiedades
@Service
public class PropiedadService {

    private final PropiedadRepository repository;

    public PropiedadService(PropiedadRepository repository) { this.repository = repository; }

    public List<Propiedad> findAll() { return repository.findAll(); }
    public Propiedad findById(Long id) { return repository.findById(id).orElseThrow(() -> new RuntimeException("Propiedad no encontrada")); }
    public Propiedad save(Propiedad p) { return repository.save(p); }
    public Propiedad update(Long id, Propiedad p) {
        Propiedad ex = findById(id);
        ex.setDueno(p.getDueno());
        ex.setDireccion(p.getDireccion());
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