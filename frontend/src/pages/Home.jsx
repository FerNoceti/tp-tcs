import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import anuncioService from "../api/anuncioService";
import "../styles/home.css";

function Home() {
  const [summary, setSummary] = useState({
    activos: 0,
    pausados: 0,
    finalizados: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await anuncioService.getAll();
        const data = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.content)
          ? res.data.content
          : [];
        const activos = data.filter((a) => a.estado === "ACTIVO").length;
        const pausados = data.filter((a) => a.estado === "PAUSADO").length;
        const finalizados = data.filter(
          (a) => a.estado === "FINALIZADO"
        ).length;
        setSummary({ activos, pausados, finalizados });
      } catch (err) {
        setError("No se pudo cargar el resumen de anuncios");
      }
    };
    fetchSummary();
  }, []);

  return (
    <div>
      <section className="home-hero">
        <h1>Sistema Inmobiliario</h1>
        <p>Administra anuncios, propiedades y dueños de forma simple y rápida.</p>
        <div className="cta-buttons">
          <Link to="/anuncios" className="btn btn-primary">Ver Anuncios</Link>
          <Link to="/propiedades" className="btn btn-outline">Ver Propiedades</Link>
          <Link to="/duenos" className="btn btn-outline">Ver Dueños</Link>
        </div>
      </section>

      <section className="grid home-stats">
        <div className="card">
          <p className="card-title">Anuncios activos</p>
          <p className="card-value">{summary.activos}</p>
        </div>
        <div className="card">
          <p className="card-title">Anuncios pausados</p>
          <p className="card-value">{summary.pausados}</p>
        </div>
        <div className="card">
          <p className="card-title">Anuncios finalizados</p>
          <p className="card-value">{summary.finalizados}</p>
        </div>
      </section>

      {error && (
        <div style={{ marginTop: 12 }}>
          <span style={{ color: '#e53935' }}>{error}</span>
        </div>
      )}
    </div>
  );
}

export default Home;
