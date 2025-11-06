package com.inmobiliaria.service;

import com.inmobiliaria.model.Direccion;
import com.inmobiliaria.model.Propiedad;
import com.inmobiliaria.repository.DireccionRepository;
import com.inmobiliaria.repository.PropiedadRepository;
import org.springframework.stereotype.Service;
import java.util.List;

// Lógica de negocio para direcciones
@Service
public class DireccionService {
    private final DireccionRepository direccionRepository;
    private final PropiedadRepository propiedadRepository;

    public DireccionService(DireccionRepository direccionRepository, PropiedadRepository propiedadRepository) {
        this.direccionRepository = direccionRepository;
        this.propiedadRepository = propiedadRepository;
    }

    public List<Direccion> findAll() { return direccionRepository.findAll(); }
    public Direccion findById(Long id) { return direccionRepository.findById(id).orElseThrow(() -> new RuntimeException("Dirección no encontrada")); }
    public Direccion save(Direccion d) { return direccionRepository.save(d); }
    public void delete(Long id) { direccionRepository.deleteById(id); }

    public Direccion getByProperty(Long idPropiedad) {
        Propiedad p = propiedadRepository.findById(idPropiedad).orElseThrow(() -> new RuntimeException("Propiedad no encontrada"));
        return p.getDireccion();
    }

    public Direccion updateByProperty(Long idPropiedad, Direccion data) {
        Propiedad p = propiedadRepository.findById(idPropiedad).orElseThrow(() -> new RuntimeException("Propiedad no encontrada"));
        Direccion d = p.getDireccion();
        if (d == null) {
            d = new Direccion();
        }
        d.setCalle(data.getCalle());
        d.setNumero(data.getNumero());
        d.setCiudad(data.getCiudad());
        d.setProvincia(data.getProvincia());
        d.setCodigoPostal(data.getCodigoPostal());
        Direccion saved = direccionRepository.save(d);
        p.setDireccion(saved);
        propiedadRepository.save(p);
        return saved;
    }
}