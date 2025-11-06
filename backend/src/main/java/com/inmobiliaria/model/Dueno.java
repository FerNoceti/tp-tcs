package com.inmobiliaria.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import jakarta.persistence.*;

// Clase abstracta que representa un dueño
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "tipo")
@JsonSubTypes({
        @JsonSubTypes.Type(value = PersonaFisica.class, name = "FISICO"),
        @JsonSubTypes.Type(value = PersonaJuridica.class, name = "JURIDICO")
})
public abstract class Dueno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long idDueno;

    // Contacto
    private String email;
    private String telefono;

    public Dueno() {}

    public Long getIdDueno() { return idDueno; }
    public void setIdDueno(Long idDueno) { this.idDueno = idDueno; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String obtenerPropiedades() { return "Relación gestionada desde Propiedad"; }
}