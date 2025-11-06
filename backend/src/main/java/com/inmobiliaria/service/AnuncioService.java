package com.inmobiliaria.service;

import com.inmobiliaria.model.Anuncio;
import com.inmobiliaria.repository.AnuncioRepository;
import org.springframework.stereotype.Service;
import java.util.List;

// Lógica de negocio para los anuncios
@Service
public class AnuncioService {

    private final AnuncioRepository anuncioRepository;

    public AnuncioService(AnuncioRepository anuncioRepository) {
        this.anuncioRepository = anuncioRepository;
    }

    public List<Anuncio> findAll() { return anuncioRepository.findAll(); }

    public Anuncio findById(Long id) { return anuncioRepository.findById(id).orElseThrow(() -> new RuntimeException("Anuncio no encontrado")); }

    public Anuncio save(Anuncio anuncio) { return anuncioRepository.save(anuncio); }

    public Anuncio update(Long id, Anuncio anuncio) {
        Anuncio existing = findById(id);
        existing.setPrecioAnuncio(anuncio.getPrecioAnuncio());
        existing.setTipoAnuncio(anuncio.getTipoAnuncio());
        existing.setPropiedad(anuncio.getPropiedad());
        return anuncioRepository.save(existing);
    }

    public void delete(Long id) { anuncioRepository.deleteById(id); }

    public Anuncio publicar(Long id) {
        Anuncio anuncio = findById(id);
        anuncio.publicar();
        return anuncioRepository.save(anuncio);
    }

    public Anuncio pausar(Long id) {
        Anuncio anuncio = findById(id);
        anuncio.pausar();
        return anuncioRepository.save(anuncio);
    }

    public Anuncio finalizar(Long id) {
        Anuncio anuncio = findById(id);
        anuncio.finalizar();
        return anuncioRepository.save(anuncio);
    }
}