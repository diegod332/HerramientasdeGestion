// Componente de Navegación (Sidebar & Bottom Navbar)
// UTCV - 9° IDGS - Administración de Proyectos de TI
import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, User, PlusSquare, Info, LogOut } from 'lucide-react';

const Navbar = ({ onOpenCreateModal }) => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* SIDEBAR PARA ESCRITORIO */}
      <aside className="sidebar glass">
        <Link to="/" className="sidebar-logo text-gradient">
          Anstagram
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Home size={22} />
            <span>Inicio</span>
          </NavLink>

          <button onClick={onOpenCreateModal} className="nav-item" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}>
            <PlusSquare size={22} />
            <span>Crear publicación</span>
          </button>

          <NavLink to={`/profile/${usuario?.id}`} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <User size={22} />
            <span>Perfil</span>
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Info size={22} />
            <span>Proyecto UTCV</span>
          </NavLink>
        </nav>

        <button 
          onClick={handleLogout} 
          className="nav-item" 
          style={{ background: 'none', border: 'none', marginTop: 'auto', width: '100%', textAlign: 'left', color: 'rgba(239, 68, 68, 0.8)' }}
        >
          <LogOut size={22} />
          <span>Cerrar sesión</span>
        </button>
      </aside>

      {/* NAVBAR INFERIOR PARA MÓVILES */}
      <nav className="mobile-navbar glass">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Home size={22} />
        </NavLink>

        <button onClick={onOpenCreateModal} className="nav-item" style={{ background: 'none', border: 'none' }}>
          <PlusSquare size={22} />
        </button>

        <NavLink to={`/profile/${usuario?.id}`} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <User size={22} />
        </NavLink>

        <NavLink to="/about" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Info size={22} />
        </NavLink>

        <button onClick={handleLogout} className="nav-item" style={{ background: 'none', border: 'none', color: '#ff5e62' }}>
          <LogOut size={22} />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
