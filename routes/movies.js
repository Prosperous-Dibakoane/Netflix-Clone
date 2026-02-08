const express = require('express');
const router = express.Router();

// POST /watched - Save watched trailer to session
router.post('/watched', (req, res) => {
  const movie = req.body.movie;

  if (!movie || !(movie.title || movie.name)) {
    return res.status(400).json({ error: 'Invalid movie data' });
  }

  const watchedMovie = {
    id: movie.id,
    title: movie.title || movie.name,
    poster_path: movie.poster_path || movie.backdrop_path || null,
  };

  if (!watchedMovie.poster_path) {
    return res.status(400).json({ error: 'Missing poster path' });
  }

  if (!req.session.watched) req.session.watched = [];

  const exists = req.session.watched.find(m => m.id === watchedMovie.id);
  if (!exists) req.session.watched.push(watchedMovie);

  res.json({ success: true });
});

// GET /recently-watched
router.get('/recently-watched', (req, res) => {
  const watched = req.session.watched || [];
  res.json(watched);
});

module.exports = router;