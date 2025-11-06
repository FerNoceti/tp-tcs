package com.inmobiliaria.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

// Entidad que representa una propiedad inmobiliaria
@Entity
public class Propiedad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long idPropiedad;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_dueno")
    private Dueno dueno;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_direccion")
    private Direccion direccion;

    private String tipoPropiedad;
    private Integer dormitorios;
    private Integer ambientes;
    private Integer banos;
    private Integer cocheras;
    private Double superficie;

    public Propiedad() {}

    public Long getIdPropiedad() { return idPropiedad; }
    public void setIdPropiedad(Long idPropiedad) { this.idPropiedad = idPropiedad; }
    public Dueno getDueno() { return dueno; }
    public void setDueno(Dueno dueno) { this.dueno = dueno; }
    public Direccion getDireccion() { return direccion; }
    public void setDireccion(Direccion direccion) { this.direccion = direccion; }
    public String getTipoPropiedad() { return tipoPropiedad; }
    public void setTipoPropiedad(String tipoPropiedad) { this.tipoPropiedad = tipoPropiedad; }
    public Integer getDormitorios() { return dormitorios; }
    public void setDormitorios(Integer dormitorios) { this.dormitorios = dormitorios; }
    public Integer getAmbientes() { return ambientes; }
    public void setAmbientes(Integer ambientes) { this.ambientes = ambientes; }
    public Integer getBanos() { return banos; }
    public void setBanos(Integer banos) { this.banos = banos; }
    public Integer getCocheras() { return cocheras; }
    public void setCocheras(Integer cocheras) { this.cocheras = cocheras; }
    public Double getSuperficie() { return superficie; }
    public void setSuperficie(Double superficie) { this.superficie = superficie; }
}