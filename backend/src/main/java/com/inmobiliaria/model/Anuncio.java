package com.inmobiliaria.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.time.LocalDate;

// Entidad que representa un anuncio inmobiliario
@Entity
public class Anuncio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Long idAnuncio;

    @ManyToOne
    @JoinColumn(name = "id_propiedad")
    private Propiedad propiedad;

    @Enumerated(EnumType.STRING)
    private TipoAnuncio tipoAnuncio;

    private LocalDate fechaPublicacion;

    @Enumerated(EnumType.STRING)
    private EstadoAnuncio estado;

    private Double precioAnuncio;

    public Anuncio() {}

    public Long getIdAnuncio() { return idAnuncio; }
    public void setIdAnuncio(Long idAnuncio) { this.idAnuncio = idAnuncio; }
    public Propiedad getPropiedad() { return propiedad; }
    public void setPropiedad(Propiedad propiedad) { this.propiedad = propiedad; }
    public TipoAnuncio getTipoAnuncio() { return tipoAnuncio; }
    public void setTipoAnuncio(TipoAnuncio tipoAnuncio) { this.tipoAnuncio = tipoAnuncio; }
    public LocalDate getFechaPublicacion() { return fechaPublicacion; }
    public void setFechaPublicacion(LocalDate fechaPublicacion) { this.fechaPublicacion = fechaPublicacion; }
    public EstadoAnuncio getEstado() { return estado; }
    public void setEstado(EstadoAnuncio estado) { this.estado = estado; }
    public Double getPrecioAnuncio() { return precioAnuncio; }
    public void setPrecioAnuncio(Double precioAnuncio) { this.precioAnuncio = precioAnuncio; }

    public void publicar() {
        this.estado = EstadoAnuncio.ACTIVO;
        this.fechaPublicacion = LocalDate.now();
    }

    public void pausar() { this.estado = EstadoAnuncio.PAUSADO; }

    public void finalizar() { this.estado = EstadoAnuncio.FINALIZADO; }

    public void modificarPrecio(Double nuevoPrecio) { this.precioAnuncio = nuevoPrecio; }
}