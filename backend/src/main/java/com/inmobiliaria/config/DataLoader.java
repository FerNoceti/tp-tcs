package com.inmobiliaria.config;

import com.inmobiliaria.model.*;
import com.inmobiliaria.repository.AnuncioRepository;
import com.inmobiliaria.repository.PropiedadRepository;
import com.inmobiliaria.repository.DuenoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;
import java.util.Arrays;
import java.util.concurrent.ThreadLocalRandom;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner seed(
            DuenoRepository duenoRepository,
            PropiedadRepository propiedadRepository,
            AnuncioRepository anuncioRepository,
            com.inmobiliaria.repository.PersonaFisicaRepository personaFisicaRepository,
            com.inmobiliaria.repository.PersonaJuridicaRepository personaJuridicaRepository
    ) {
        return args -> {
            // Limpieza completa para resembrar datos reales en cada arranque
            // Orden: primero hijos (PersonaFisica/Juridica), luego base (Dueno), pero
            // antes borrar entidades dependientes (Anuncio, Propiedad)
            anuncioRepository.deleteAll();
            propiedadRepository.deleteAll();
            personaFisicaRepository.deleteAll();
            personaJuridicaRepository.deleteAll();
            duenoRepository.deleteAll();

            // Datos de ejemplo realistas (AR)
            List<String> nombres = Arrays.asList("Juan", "María", "Carlos", "Sofía", "Lucía", "Martín", "Agustina", "Diego", "Valentina", "Nicolás");
            List<String> apellidos = Arrays.asList("Pérez", "González", "Rodríguez", "Fernández", "López", "Martínez", "Sánchez", "Romero", "Álvarez", "Torres");

            List<String> empresas = Arrays.asList(
                    "Inmobiliaria Río", "Constructora Andina", "Grupo Patagonia",
                    "Servicios Urbanos", "Desarrollos del Plata"
            );
            List<String> ciudades = Arrays.asList("Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata", "Mar del Plata");
            List<String> provincias = Arrays.asList("Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Buenos Aires", "Buenos Aires");
            List<String> calles = Arrays.asList("Av. Corrientes", "Av. Santa Fe", "Av. Colón", "San Martín", "Belgrano", "Rivadavia", "Mitre", "Sarmiento");

            // Crear dueños personas físicas
            for (int i = 0; i < 8; i++) {
                PersonaFisica pf = new PersonaFisica();
                pf.setNombre(nombres.get(i % nombres.size()));
                pf.setApellido(apellidos.get((i * 2) % apellidos.size()));
                pf.setDni(String.format("%08d", 12000000 + i * 1234));
                pf.setEmail((pf.getNombre() + "." + pf.getApellido() + "@mail.com").toLowerCase());
                pf.setTelefono("11-4" + String.format("%07d", 3000000 + i * 137));
                duenoRepository.save(pf);
            }

            // Crear dueños personas jurídicas
            for (int i = 0; i < empresas.size(); i++) {
                PersonaJuridica pj = new PersonaJuridica();
                pj.setRazonSocial(empresas.get(i));
                pj.setCuit(String.format("30-%08d-%d", 50000000 + i * 777, (i % 9) + 1));
                pj.setEmail(empresas.get(i).replace(" ", "").toLowerCase() + "@empresa.com");
                pj.setTelefono("11-5" + String.format("%07d", 4000000 + i * 251));
                duenoRepository.save(pj);
            }

            // Obtener todos los dueños para asignar propiedades
            List<Dueno> duenos = duenoRepository.findAll();

            int propiedadCount = 0;
            for (Dueno d : duenos) {
                // Cada dueño obtiene entre 1 y 3 propiedades
                int cantidadProps = 1 + ThreadLocalRandom.current().nextInt(3);
                for (int j = 0; j < cantidadProps; j++) {
                    Direccion dir = new Direccion();
                    String ciudad = ciudades.get((propiedadCount + j) % ciudades.size());
                    String provincia = provincias.get((propiedadCount + j) % provincias.size());
                    dir.setCalle(calles.get((propiedadCount + j) % calles.size()));
                    dir.setNumero(String.valueOf(100 + ThreadLocalRandom.current().nextInt(900)));
                    dir.setCiudad(ciudad);
                    dir.setProvincia(provincia);
                    dir.setCodigoPostal(String.valueOf(1000 + ThreadLocalRandom.current().nextInt(9000)));

                    Propiedad p = new Propiedad();
                    p.setDueno(d);
                    p.setDireccion(dir); // Cascade ALL en Propiedad -> Direccion
                    p.setTipoPropiedad(j % 2 == 0 ? "Departamento" : "Casa");
                    p.setDormitorios(1 + ThreadLocalRandom.current().nextInt(4));
                    p.setAmbientes(2 + ThreadLocalRandom.current().nextInt(5));
                    p.setBanos(1 + ThreadLocalRandom.current().nextInt(3));
                    p.setCocheras(ThreadLocalRandom.current().nextInt(2));
                    p.setSuperficie(35.0 + ThreadLocalRandom.current().nextDouble(180.0));
                    p = propiedadRepository.save(p);

                    // Por cada propiedad, crear 1–2 anuncios
                    int cantidadAnuncios = 1 + ThreadLocalRandom.current().nextInt(2);
                    for (int k = 0; k < cantidadAnuncios; k++) {
                        Anuncio a = new Anuncio();
                        a.setPropiedad(p);
                        TipoAnuncio tipo = (k % 2 == 0) ? TipoAnuncio.VENTA : TipoAnuncio.ALQUILER;
                        a.setTipoAnuncio(tipo);
                        if (tipo == TipoAnuncio.VENTA) {
                            a.setPrecioAnuncio(80000.0 + ThreadLocalRandom.current().nextDouble(450000.0));
                            a.publicar();
                        } else {
                            a.setPrecioAnuncio(150000.0 + ThreadLocalRandom.current().nextDouble(600000.0));
                            // Alternar entre pausado y publicado
                            if ((propiedadCount + k) % 3 == 0) {
                                a.pausar();
                            } else {
                                a.publicar();
                            }
                        }
                        anuncioRepository.save(a);
                    }
                    propiedadCount++;
                }
            }
        };
    }
}