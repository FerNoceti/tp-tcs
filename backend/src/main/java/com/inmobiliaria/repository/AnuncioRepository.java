package com.inmobiliaria.repository;

import com.inmobiliaria.model.Anuncio;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio JPA para anuncios
public interface AnuncioRepository extends JpaRepository<Anuncio, Long> {}