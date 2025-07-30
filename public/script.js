const apiKey = "**";
const base_url = "https://api.themoviedb.org/3";
const img_url = "https://image.tmdb.org/t/p/w300";
const banner_url = "https://image.tmdb.org/t/p/original";

const requests = {
  fetchTrending: `${base_url}/trending/all/week?api_key=${apiKey}&language=en-US`,
  fetchNetflixOriginals: `${base_url}/discover/tv?api_key=${apiKey}&with_networks=213`,
  fetchActionMovies: `${base_url}/discover/movie?api_key=${apiKey}&with_genres=28`,
  fetchComedyMovies: `${base_url}/discover/movie?api_key=${apiKey}&with_genres=35`,
  fetchHorrorMovies: `${base_url}/discover/movie?api_key=${apiKey}&with_genres=27`,
  fetchRomanceMovies: `${base_url}/discover/movie?api_key=${apiKey}&with_genres=10749`,
  fetchDocumentaries: `${base_url}/discover/movie?api_key=${apiKey}&with_genres=99`,
};