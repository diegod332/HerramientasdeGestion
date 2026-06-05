// Middleware de Autenticación para Proteger Rutas con JWT
// UTCV - 9° IDGS - Administración de Proyectos de TI
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  // Obtener token del header Authorization
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token.' });
  }

  // El token normalmente viene en formato "Bearer TOKEN"
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET || 'anstagram_jwt_secret_token_utc_9idgs');
    req.usuario = verificado; // Adjuntar datos del usuario verificado al request
    next();
  } catch (error) {
    res.status(403).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = authMiddleware;
