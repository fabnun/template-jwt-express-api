const jwt = require('jsonwebtoken');
const express = require('express');
const ejs = require('ejs');

// Inicia la aplicación
const app = express();

// Renderiza archivos html de la carpeta views con ejs
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Permite recibir datos en formato JSON
app.use(express.json());

// El home se renderiza con ejs, usando un titulo y un mensaje
app.get('/', function (req, res) {
  const titulo = 'Basic API : NodeJS, Express, EJS y JWT';
  res.render('index', {
    titulo: titulo,
    mensaje: `
    <h1>${titulo}</h1>
    <ul>
        <li><code>/login</code> iniciar sesión</li>
        <li><code>/logout</code> cerrar sesión</li>
        <li><code>/sumar</code> sumar dos números (requiere token valido)</li>
    </ul> 
  `,
  });
});

// API login
app.post('/login', (req, res) => {
  // Recibe los datos del usuario y la contraseña
  const { username, password } = req.body;
  // Verifica las credenciales con valores de ejemplo (deberia usar una base de datos y encriptar la contraseña)
  if (username === 'usuario' && password === 'contraseña') {
    // Genera el token de autenticación, usando el nombre de usuario como payload
    const token = jwt.sign({ username }, 'secret-key');
    // Devuelve el token
    res.json({ token });
  } else {
    // Devuelve un error si las credenciales son inválidas
    res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }
});

//API logout, requiere validar token
app.post('/logout', validateToken, (req, res) => {
  // Devuelve mensaje de exito
  res.json({ mensaje: 'Logout exitoso' });
});

//API sumar, requiere validar token
app.post('/sumar', validateToken, (req, res) => {
  // Recibe los datos del formulario
  const { num1, num2 } = req.body;
  // Suma los números
  const resultado = num1 + num2;
  // Devuelve el resultado
  res.json({ resultado });
});

// Función para validar el token
function validateToken(req, res, next) {
  // Obtiene el token del header de la petición
  const token = req.headers.authorization;
  try {
    // Verifica que el token sea del tipo Bearer
    if (token.startsWith('Bearer ')) {
      // Verifica que el token sea válido
      jwt.verify(token.substring(7), 'secret-key');
      // Continua con la petición
      next();
    } else {
      // Devuelve un error si el token no es del tipo Bearer
      res.status(401).json({ mensaje: 'Sin autorización, Token inválido' });
    }
  } catch (err) {
    // Devuelve un error si se genera un error al verificar el token
    res.status(401).json({ mensaje: 'Sin autorización, Token inválido' });
  }
}

// Inicia el servidor en el puerto 3000
const port = 3000;
app.listen(port, () => console.log('http://localhost:' + port));
