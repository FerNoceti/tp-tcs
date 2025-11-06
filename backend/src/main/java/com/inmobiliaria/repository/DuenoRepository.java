package com.inmobiliaria.repository;

import com.inmobiliaria.model.Dueno;
import org.springframework.data.jpa.repository.JpaRepository;

// Repositorio JPA para dueños
public interface DuenoRepository extends JpaRepository<Dueno, Long> {}