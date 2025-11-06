package com.inmobiliaria.repository;

import com.inmobiliaria.model.Propiedad;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio JPA para propiedades
public interface PropiedadRepository extends JpaRepository<Propiedad, Long> {}