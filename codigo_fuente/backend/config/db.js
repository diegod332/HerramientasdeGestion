// Configuración de la conexión a la Base de Datos (MySQL)
// UTCV - 9° IDGS - Administración de Proyectos de TI
const mysql = require('mysql2');
require('dotenv').config();

// Crear pool de conexiones para optimizar rendimiento
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'anstagram_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Promisificar el pool para soportar async/await
const db = pool.promise();

// Verificar la conexión inicial
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos MySQL:', err.message);
    console.log('⚠️ Por favor, asegúrate de que MySQL está corriendo y configurado correctamente.');
  } else {
    console.log('✅ Conexión exitosa a la base de datos MySQL en Anstagram');
    connection.release();
  }
});

module.exports = db;
