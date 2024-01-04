const express - require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Public/logIn.html');
});

app.get('/' (res, res) => {
  res.sendFile(__dirname + '/Public/homePage.html')
});

app.listen(port, () => {
  console.log(`Server running on Port http://localhost:${port}`)
});