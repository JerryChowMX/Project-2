const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Middleware para servir archivos estáticos
app.use(express.static('Public'));
console.log('Static files middleware set up for Public directory.');

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Ruta GET para la página de inicio de sesión
app.get('/login', (req, res) => {
  console.log('Accessing /login route');
  res.sendFile(__dirname + '../Public/logIn.html');
  console.log('logIn.html file served.');
});

// Ruta POST para manejar el envío del formulario de inicio de sesión
app.post('/login', (req, res) => {
  console.log('Login form submitted.');
  const { username, email, password } = req.body;
  console.log('Login credentials:', username, email, password);
  res.redirect('../Views/homePage.handlebars');
});

// Ruta GET para la página principal (usando Handlebars)
app.get('/', (req, res) => {
  console.log('Accessing root (/) route');
  res.render('../Views/homePage.handlebars');
  console.log('homePage rendered.');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
