// Pantalla Informativa del Proyecto Académico (Anstagram)
// UTCV - 9° IDGS - Administración de Proyectos de TI
import React from 'react';
import { Shield, Users, Layers, ExternalLink } from 'lucide-react';

const About = () => {
  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="glass" style={{ padding: '35px', borderRadius: '20px', marginBottom: '30px' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '10px' }}>
          Anstagram
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '20px' }}>
          Proyecto Integrador desarrollado para la materia de <strong>Administración de Proyectos de TI</strong> en la 
          Universidad Tecnológica del Centro de Veracruz (UTCV), Campus Cuitláhuac.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
          <div className="glass" style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-tertiary)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: '700', marginBottom: '10px', color: 'var(--accent-color)' }}>
              <Layers size={18} /> Estructura
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Arquitectura monolítica desacoplada con frontend en React, backend en Node.js + Express, y base de datos relacional MySQL.
            </p>
          </div>

          <div className="glass" style={{ padding: '20px', borderRadius: '12px', background: 'var(--bg-tertiary)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem', fontWeight: '700', marginBottom: '10px', color: 'var(--accent-color)' }}>
              <Shield size={18} /> Seguridad
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Autenticación robusta basada en JWT (JSON Web Tokens) y contraseñas seguras cifradas con algoritmo hash bcryptjs.
            </p>
          </div>
        </div>
      </div>

      {/* Integrantes del Equipo */}
      <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Users size={22} color="var(--accent-color)" /> Integrantes del Equipo
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="glass" style={{ padding: '15px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>Diego Sanchez Sanchez</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Líder de Proyecto / Desarrollador Backend</p>
            </div>
            <span style={{ fontSize: '0.75rem', background: 'rgba(255, 94, 98, 0.15)', color: 'var(--accent-color)', padding: '4px 10px', borderRadius: '10px', fontWeight: '600' }}>
              LÍDER & BACKEND
            </span>
          </div>

          <div className="glass" style={{ padding: '15px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>Alberto Valerio Romero</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Desarrollador Frontend / Diseñador UI/UX</p>
            </div>
            <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '10px', fontWeight: '600' }}>
              FRONTEND / UI
            </span>
          </div>

          <div className="glass" style={{ padding: '15px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600' }}>Joaquin Daniel Garcia Cobos</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Administrador de Base de Datos / Ingeniero QA</p>
            </div>
            <span style={{ fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', padding: '4px 10px', borderRadius: '10px', fontWeight: '600' }}>
              DB / QA
            </span>
          </div>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <p>© 2026 Anstagram • UTCV Campus Cuitláhuac</p>
          <p style={{ marginTop: '5px' }}>Ingeniería en Desarrollo y Gestión de Software • 9° IDGS Grupo A</p>
        </div>
      </div>
    </div>
  );
};

export default About;
