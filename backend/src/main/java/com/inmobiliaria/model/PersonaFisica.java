package com.inmobiliaria.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;

// Dueño persona física
@Entity
public class PersonaFisica extends Dueno {

    @NotBlank
    private String nombre;

    @NotBlank
    private String apellido;

    @NotBlank
    private String dni;

    public PersonaFisica() {}

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getApellido() { return apellido; }
    public void setApellido(String apellido) { this.apellido = apellido; }
    public String getDni() { return dni; }
    public void setDni(String dni) { this.dni = dni; }
}