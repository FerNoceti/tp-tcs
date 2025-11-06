package com.inmobiliaria.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;

// Dueño persona jurídica
@Entity
public class PersonaJuridica extends Dueno {

    @NotBlank
    private String razonSocial;

    @NotBlank
    private String cuit;

    public PersonaJuridica() {}

    public String getRazonSocial() { return razonSocial; }
    public void setRazonSocial(String razonSocial) { this.razonSocial = razonSocial; }
    public String getCuit() { return cuit; }
    public void setCuit(String cuit) { this.cuit = cuit; }
}