package com.inmobiliaria.repository;

import com.inmobiliaria.model.Direccion;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio JPA para direcciones
public interface DireccionRepository extends JpaRepository<Direccion, Long> {}