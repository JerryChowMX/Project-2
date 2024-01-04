const express = require('express');
const { engine } = require('express-handlebars');

const app = express();
const port = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

// Middleware para servir archivos estáticos
app.use(express.static('Public'));

// Ruta GET para la página de inicio de sesión
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/Public/logIn.html');
});

// Ruta GET para la página principal (usando Handlebars)
app.get('/', (req, res) => {
  res.render('homePage'); // Asegúrate de tener una plantilla llamada homePage.handlebars
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
