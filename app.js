const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home', { session: req.session });
});

// 404 Debugging Helper
app.use((req, res) => {
  res.status(404).send(`404 Not Found: ${req.originalUrl}`);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
