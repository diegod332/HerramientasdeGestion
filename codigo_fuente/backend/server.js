// Servidor Principal de la API REST - Anstagram
// UTCV - 9° IDGS - Administración de Proyectos de TI
// Diego Sanchez (Líder / Backend), Alberto Valerio (Frontend), Joaquin Daniel Garcia (DB/QA)

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

const db = require('./config/db');
const authMiddleware = require('./middlewares/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS para permitir peticiones desde el frontend
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Asegurar que exista la carpeta de uploads para las imágenes subidas
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// Configurar almacenamiento con Multer para subida de fotos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      return cb(null, true);
    }
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, webp).'));
  }
});

// BASE DE DATOS - Modo Fallback (Mock) para pruebas si MySQL no está disponible
let usandoMock = false;
let mockUsuarios = [
  { id: 1, username: 'diego_sanchez', email: 'diego@anstagram.com', password_hash: '$2a$10$7Rz6/d9m17k6l0vU2iI8fOn9XfF7c8QfAHzuJ1mEqbJ6wS83r2R4y', bio: 'Líder de Proyecto & Backend Dev de Anstagram. UTCV 9-IDGS.', foto_perfil: 'default_profile.png' },
  { id: 2, username: 'alberto_valerio', email: 'alberto@anstagram.com', password_hash: '$2a$10$7Rz6/d9m17k6l0vU2iI8fOn9XfF7c8QfAHzuJ1mEqbJ6wS83r2R4y', bio: 'Frontend Developer & Diseñador de Interfaces UI/UX.', foto_perfil: 'default_profile.png' },
  { id: 3, username: 'joaquin_garcia', email: 'joaquin@anstagram.com', password_hash: '$2a$10$7Rz6/d9m17k6l0vU2iI8fOn9XfF7c8QfAHzuJ1mEqbJ6wS83r2R4y', bio: 'Administrador de Base de Datos y Especialista QA.', foto_perfil: 'default_profile.png' }
];

let mockPublicaciones = [
  { id: 1, usuario_id: 1, username: 'diego_sanchez', foto_perfil: 'default_profile.png', imagen_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800', descripcion: '¡Arrancando el proyecto de Administración de Proyectos de TI! #Anstagram #UTCV', likes_count: 2, ya_dio_like: false, comentarios: [{ id: 1, username: 'alberto_valerio', contenido: '¡Excelente iniciativa, Diego! Vamos con todo.' }, { id: 2, username: 'joaquin_garcia', contenido: 'Ya tengo listos los scripts de la base de datos.' }], created_at: new Date() },
  { id: 2, usuario_id: 2, username: 'alberto_valerio', foto_perfil: 'default_profile.png', imagen_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800', descripcion: 'Diseñando la interfaz premium de Anstagram usando React y CSS puro. ¡Se ve genial! 🎨', likes_count: 3, ya_dio_like: false, comentarios: [{ id: 3, username: 'diego_sanchez', contenido: '¡Ese diseño está increíble, Alberto!' }], created_at: new Date() }
];

let mockStories = [
  { id: 1, usuario_id: 1, username: 'diego_sanchez', imagen_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' },
  { id: 2, usuario_id: 2, username: 'alberto_valerio', imagen_url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300' },
  { id: 3, usuario_id: 3, username: 'joaquin_garcia', imagen_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300' }
];

let mockSeguidores = [
  { seguidor_id: 1, seguido_id: 2 },
  { seguidor_id: 2, seguido_id: 1 }
];

let mockLikes = [
  { usuario_id: 1, publicacion_id: 2 },
  { usuario_id: 2, publicacion_id: 1 }
];

// Detectar si usamos la base de datos real o la simulación
db.query('SELECT 1').catch(() => {
  usandoMock = true;
  console.log('⚠️ Base de datos MySQL desconectada. Activando Modo Simulador (Mock) para pruebas locales sin errores.');
});


// ==========================================
// RUTA DE BIENVENIDA / ESTADO
// ==========================================
app.get('/api/estado', (req, res) => {
  res.json({
    proyecto: 'Anstagram API',
    materia: 'Administración de Proyectos de TI (UTCV)',
    integrantes: ['Diego Sanchez', 'Alberto Valerio', 'Joaquin Daniel Garcia'],
    conexion_db: usandoMock ? 'SIMULADA (MOCK)' : 'REAL (MYSQL)'
  });
});


// ==========================================
// ENDPOINT: Registro de Usuario (POST /api/auth/register)
// ==========================================
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password, bio } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ mensaje: 'Por favor, llena todos los campos obligatorios.' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    if (usandoMock) {
      const existeUser = mockUsuarios.find(u => u.username === username || u.email === email);
      if (existeUser) return res.status(400).json({ mensaje: 'El usuario o correo electrónico ya existe.' });

      const nuevoUsuario = {
        id: mockUsuarios.length + 1,
        username,
        email,
        password_hash: passwordHash,
        bio: bio || '',
        foto_perfil: 'default_profile.png'
      };
      mockUsuarios.push(nuevoUsuario);

      // Generar token JWT
      const token = jwt.sign({ id: nuevoUsuario.id, username: nuevoUsuario.username }, process.env.JWT_SECRET || 'anstagram_jwt_secret_token_utc_9idgs', { expiresIn: '24h' });
      return res.status(201).json({ mensaje: 'Usuario registrado exitosamente (Mock)', token, usuario: { id: nuevoUsuario.id, username, email, bio, foto_perfil: nuevoUsuario.foto_perfil } });
    } else {
      // Usar MySQL
      const [existentes] = await db.query('SELECT id FROM usuarios WHERE username = ? OR email = ?', [username, email]);
      if (existentes.length > 0) {
        return res.status(400).json({ mensaje: 'El usuario o correo electrónico ya existe.' });
      }

      const [resultado] = await db.query(
        'INSERT INTO usuarios (username, email, password_hash, bio, foto_perfil) VALUES (?, ?, ?, ?, ?)',
        [username, email, passwordHash, bio || '', 'default_profile.png']
      );

      const token = jwt.sign({ id: resultado.insertId, username }, process.env.JWT_SECRET || 'anstagram_jwt_secret_token_utc_9idgs', { expiresIn: '24h' });
      return res.status(201).json({
        mensaje: 'Usuario registrado exitosamente',
        token,
        usuario: { id: resultado.insertId, username, email, bio: bio || '', foto_perfil: 'default_profile.png' }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar el usuario.', error: error.message });
  }
});


// ==========================================
// ENDPOINT: Inicio de Sesión (POST /api/auth/login)
// ==========================================
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ mensaje: 'Por favor, introduce correo y contraseña.' });
  }

  try {
    let usuario;

    if (usandoMock) {
      usuario = mockUsuarios.find(u => u.email === email);
    } else {
      const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      if (rows.length > 0) usuario = rows[0];
    }

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Correo electrónico o contraseña incorrectos.' });
    }

    const contraseñaValida = await bcrypt.compare(password, usuario.password_hash);
    if (!contraseñaValida) {
      return res.status(400).json({ mensaje: 'Correo electrónico o contraseña incorrectos.' });
    }

    const token = jwt.sign({ id: usuario.id, username: usuario.username }, process.env.JWT_SECRET || 'anstagram_jwt_secret_token_utc_9idgs', { expiresIn: '24h' });

    res.json({
      mensaje: 'Autenticación exitosa',
      token,
      usuario: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        bio: usuario.bio,
        foto_perfil: usuario.foto_perfil
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión.', error: error.message });
  }
});


// ==========================================
// ENDPOINT: Obtener Publicaciones (GET /api/posts)
// ==========================================
app.get('/api/posts', async (req, res) => {
  // Opcional: obtener ID del usuario actual si manda token
  const authHeader = req.headers['authorization'];
  let usuarioId = null;
  if (authHeader) {
    try {
      const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
      const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'anstagram_jwt_secret_token_utc_9idgs');
      usuarioId = decodificado.id;
    } catch (e) {
      // Ignorar token inválido aquí, solo mostrar feed público
    }
  }

  try {
    if (usandoMock) {
      const postsFormateados = mockPublicaciones.map(post => {
        const yaDioLike = usuarioId ? mockLikes.some(l => l.usuario_id === usuarioId && l.publicacion_id === post.id) : false;
        return { ...post, ya_dio_like: yaDioLike };
      });
      return res.json(postsFormateados);
    } else {
      // Query SQL avanzada para traer posts con info de usuario, conteo de likes, comentarios y si el usuario actual le dio like
      const query = `
        SELECT p.*, u.username, u.foto_perfil,
          (SELECT COUNT(*) FROM likes WHERE publicacion_id = p.id) AS likes_count,
          IF(? IS NULL, 0, EXISTS(SELECT 1 FROM likes WHERE publicacion_id = p.id AND usuario_id = ?)) AS ya_dio_like
        FROM publicaciones p
        JOIN usuarios u ON p.usuario_id = u.id
        ORDER BY p.created_at DESC
      `;
      const [posts] = await db.query(query, [usuarioId, usuarioId]);

      // Adjuntar comentarios a cada post
      for (let post of posts) {
        const [coms] = await db.query(
          'SELECT c.id, c.contenido, u.username FROM comentarios c JOIN usuarios u ON c.usuario_id = u.id WHERE c.publicacion_id = ? ORDER BY c.created_at ASC',
          [post.id]
        );
        post.comentarios = coms;
      }

      res.json(posts);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener publicaciones.', error: error.message });
  }
});


// ==========================================
// ENDPOINT: Crear Publicación (POST /api/posts)
// ==========================================
app.post('/api/posts', authMiddleware, upload.single('imagen'), async (req, res) => {
  const { descripcion } = req.body;
  const usuarioId = req.usuario.id;

  if (!req.file && !req.body.imagen_url) {
    return res.status(400).json({ mensaje: 'Debes subir una imagen para publicar.' });
  }

  // URL final de la imagen
  const imagenUrl = req.file ? `uploads/${req.file.filename}` : req.body.imagen_url;

  try {
    if (usandoMock) {
      const nuevoPost = {
        id: mockPublicaciones.length + 1,
        usuario_id: usuarioId,
        username: req.usuario.username,
        foto_perfil: 'default_profile.png',
        imagen_url: imagenUrl,
        descripcion: descripcion || '',
        likes_count: 0,
        ya_dio_like: false,
        comentarios: [],
        created_at: new Date()
      };
      mockPublicaciones.unshift(nuevoPost);
      return res.status(201).json({ mensaje: 'Publicación creada exitosamente (Mock)', post: nuevoPost });
    } else {
      const [resultado] = await db.query(
        'INSERT INTO publicaciones (usuario_id, imagen_url, descripcion) VALUES (?, ?, ?)',
        [usuarioId, imagenUrl, descripcion || '']
      );

      const [postCreado] = await db.query(
        `SELECT p.*, u.username, u.foto_perfil, 0 AS likes_count, 0 AS ya_dio_like 
         FROM publicaciones p 
         JOIN usuarios u ON p.usuario_id = u.id 
         WHERE p.id = ?`,
        [resultado.insertId]
      );

      const post = postCreado[0];
      post.comentarios = [];

      res.status(201).json({ mensaje: 'Publicación creada exitosamente', post });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la publicación.', error: error.message });
  }
});


// ==========================================
// ENDPOINT: Dar/Quitar Like (POST /api/posts/:id/like)
// ==========================================
app.post('/api/posts/:id/like', authMiddleware, async (req, res) => {
  const publicacionId = parseInt(req.params.id);
  const usuarioId = req.usuario.id;

  try {
    if (usandoMock) {
      const post = mockPublicaciones.find(p => p.id === publicacionId);
      if (!post) return res.status(404).json({ mensaje: 'Publicación no encontrada.' });

      const index = mockLikes.findIndex(l => l.usuario_id === usuarioId && l.publicacion_id === publicacionId);
      if (index === -1) {
        mockLikes.push({ usuario_id: usuarioId, publicacion_id: publicacionId });
        post.likes_count += 1;
        return res.json({ mensaje: 'Le diste like a la publicación', likes_count: post.likes_count, ya_dio_like: true });
      } else {
        mockLikes.splice(index, 1);
        post.likes_count -= 1;
        return res.json({ mensaje: 'Quitaste tu like de la publicación', likes_count: post.likes_count, ya_dio_like: false });
      }
    } else {
      // Verificar si la publicación existe
      const [posts] = await db.query('SELECT id FROM publicaciones WHERE id = ?', [publicacionId]);
      if (posts.length === 0) {
        return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
      }

      // Verificar si ya tiene like
      const [likes] = await db.query('SELECT id FROM likes WHERE usuario_id = ? AND publicacion_id = ?', [usuarioId, publicacionId]);

      if (likes.length === 0) {
        // Dar like
        await db.query('INSERT INTO likes (usuario_id, publicacion_id) VALUES (?, ?)', [usuarioId, publicacionId]);
        const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM likes WHERE publicacion_id = ?', [publicacionId]);
        return res.json({ mensaje: 'Le diste like a la publicación', likes_count: total, ya_dio_like: true });
      } else {
        // Quitar like
        await db.query('DELETE FROM likes WHERE usuario_id = ? AND publicacion_id = ?', [usuarioId, publicacionId]);
        const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM likes WHERE publicacion_id = ?', [publicacionId]);
        return res.json({ mensaje: 'Quitaste tu like de la publicación', likes_count: total, ya_dio_like: false });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar el like.', error: error.message });
  }
});


// ==========================================
// ENDPOINT: Agregar Comentario (POST /api/posts/:id/comments)
// ==========================================
app.post('/api/posts/:id/comments', authMiddleware, async (req, res) => {
  const publicacionId = parseInt(req.params.id);
  const usuarioId = req.usuario.id;
  const { contenido } = req.body;

  if (!contenido) {
    return res.status(400).json({ mensaje: 'El contenido del comentario es obligatorio.' });
  }

  try {
    if (usandoMock) {
      const post = mockPublicaciones.find(p => p.id === publicacionId);
      if (!post) return res.status(404).json({ mensaje: 'Publicación no encontrada.' });

      const nuevoComentario = {
        id: Date.now(),
        username: req.usuario.username,
        contenido: contenido
      };

      post.comentarios.push(nuevoComentario);
      return res.status(201).json({ mensaje: 'Comentario agregado (Mock)', comentario: nuevoComentario });
    } else {
      // Verificar si la publicación existe
      const [posts] = await db.query('SELECT id FROM publicaciones WHERE id = ?', [publicacionId]);
      if (posts.length === 0) {
        return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
      }

      await db.query(
        'INSERT INTO comentarios (usuario_id, publicacion_id, contenido) VALUES (?, ?, ?)',
        [usuarioId, publicacionId, contenido]
      );

      const [comentarios] = await db.query(
        `SELECT c.id, c.contenido, u.username 
         FROM comentarios c 
         JOIN usuarios u ON c.usuario_id = u.id 
         WHERE c.publicacion_id = ? 
         ORDER BY c.created_at DESC LIMIT 1`,
        [publicacionId]
      );

      res.status(201).json({ mensaje: 'Comentario agregado', comentario: comentarios[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al agregar comentario.', error: error.message });
  }
});


// ==========================================
// ENDPOINT: Perfil del Usuario (GET /api/users/:id/profile)
// ==========================================
app.get('/api/users/:id/profile', async (req, res) => {
  const perfilId = parseInt(req.params.id);

  // Opcional: obtener ID del usuario autenticado para saber si ya lo sigue
  const authHeader = req.headers['authorization'];
  let logueadoId = null;
  if (authHeader) {
    try {
      const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
      const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'anstagram_jwt_secret_token_utc_9idgs');
      logueadoId = decodificado.id;
    } catch (e) {}
  }

  try {
    if (usandoMock) {
      const usuario = mockUsuarios.find(u => u.id === perfilId);
      if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' });

      const postsUsuario = mockPublicaciones.filter(p => p.usuario_id === perfilId);
      const seguidoresCount = mockSeguidores.filter(s => s.seguido_id === perfilId).length;
      const seguidosCount = mockSeguidores.filter(s => s.seguidor_id === perfilId).length;
      const siguiendo = logueadoId ? mockSeguidores.some(s => s.seguidor_id === logueadoId && s.seguido_id === perfilId) : false;

      return res.json({
        usuario: {
          id: usuario.id,
          username: usuario.username,
          bio: usuario.bio,
          foto_perfil: usuario.foto_perfil,
          posts_count: postsUsuario.length,
          seguidores_count: seguidoresCount,
          seguidos_count: seguidosCount,
          siguiendo
        },
        publicaciones: postsUsuario
      });
    } else {
      // Datos del perfil
      const [usuarios] = await db.query(
        `SELECT id, username, bio, foto_perfil, created_at,
          (SELECT COUNT(*) FROM publicaciones WHERE usuario_id = ?) AS posts_count,
          (SELECT COUNT(*) FROM seguidores WHERE seguido_id = ?) AS seguidores_count,
          (SELECT COUNT(*) FROM seguidores WHERE seguidor_id = ?) AS seguidos_count,
          IF(? IS NULL, 0, EXISTS(SELECT 1 FROM seguidores WHERE seguido_id = ? AND seguidor_id = ?)) AS siguiendo
         FROM usuarios WHERE id = ?`,
        [perfilId, perfilId, perfilId, logueadoId, perfilId, logueadoId, perfilId]
      );

      if (usuarios.length === 0) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
      }

      // Publicaciones del perfil
      const [posts] = await db.query(
        `SELECT id, imagen_url, descripcion, created_at,
          (SELECT COUNT(*) FROM likes WHERE publicacion_id = publicaciones.id) AS likes_count
         FROM publicaciones WHERE usuario_id = ? ORDER BY created_at DESC`,
        [perfilId]
      );

      res.json({
        usuario: usuarios[0],
        publicaciones: posts
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener perfil.', error: error.message });
  }
});


// ==========================================
// ENDPOINT: Seguir/Dejar de Seguir (POST /api/users/:id/follow)
// ==========================================
app.post('/api/users/:id/follow', authMiddleware, async (req, res) => {
  const seguidoId = parseInt(req.params.id);
  const seguidorId = req.usuario.id;

  if (seguidoId === seguidorId) {
    return res.status(400).json({ mensaje: 'No puedes seguirte a ti mismo.' });
  }

  try {
    if (usandoMock) {
      const existeUser = mockUsuarios.find(u => u.id === seguidoId);
      if (!existeUser) return res.status(404).json({ mensaje: 'Usuario a seguir no encontrado.' });

      const index = mockSeguidores.findIndex(s => s.seguidor_id === seguidorId && s.seguido_id === seguidoId);
      if (index === -1) {
        mockSeguidores.push({ seguidor_id: seguidorId, seguido_id: seguidoId });
        return res.json({ mensaje: `Ahora sigues a ${existeUser.username}`, siguiendo: true });
      } else {
        mockSeguidores.splice(index, 1);
        return res.json({ mensaje: `Dejaste de seguir a ${existeUser.username}`, siguiendo: false });
      }
    } else {
      // Verificar existencia de usuario a seguir
      const [usuarios] = await db.query('SELECT id, username FROM usuarios WHERE id = ?', [seguidoId]);
      if (usuarios.length === 0) {
        return res.status(404).json({ mensaje: 'Usuario a seguir no encontrado.' });
      }

      // Verificar si ya se sigue
      const [relacion] = await db.query('SELECT id FROM seguidores WHERE seguidor_id = ? AND seguido_id = ?', [seguidorId, seguidoId]);

      if (relacion.length === 0) {
        await db.query('INSERT INTO seguidores (seguidor_id, seguido_id) VALUES (?, ?)', [seguidorId, seguidoId]);
        return res.json({ mensaje: `Ahora sigues a ${usuarios[0].username}`, siguiendo: true });
      } else {
        await db.query('DELETE FROM seguidores WHERE seguidor_id = ? AND seguido_id = ?', [seguidorId, seguidoId]);
        return res.json({ mensaje: `Dejaste de seguir a ${usuarios[0].username}`, siguiendo: false });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al procesar seguimiento.', error: error.message });
  }
});


// ==========================================
// ENDPOINT: Obtener Stories Activas (GET /api/stories)
// ==========================================
app.get('/api/stories', async (req, res) => {
  try {
    if (usandoMock) {
      return res.json(mockStories);
    } else {
      const query = `
        SELECT s.id, s.imagen_url, s.usuario_id, u.username, u.foto_perfil
        FROM stories s
        JOIN usuarios u ON s.usuario_id = u.id
        WHERE s.expira_at > NOW()
        ORDER BY s.created_at DESC
      `;
      const [stories] = await db.query(query);
      res.json(stories);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las stories.', error: error.message });
  }
});


// Iniciar el servidor Express
app.listen(PORT, () => {
  console.log(`🚀 Servidor de Anstagram corriendo en http://localhost:${PORT}`);
  console.log(`📂 Imágenes estáticas accesibles en http://localhost:${PORT}/uploads/`);
});
