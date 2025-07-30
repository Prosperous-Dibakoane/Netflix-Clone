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

fetch(requests.fetchTrending)
  .then((res) => res.json())
  .then((data) => {
    const movie = data.results[Math.floor(Math.random() * data.results.length)];
    const banner = document.getElementById("banner");
    const title = document.getElementById("banner_title");
    const desc = document.getElementById("banner_description");

    banner.style.backgroundImage = `url(${banner_url}${movie.backdrop_path})`;
    title.textContent = movie.title || movie.name || "Title";
    desc.textContent = truncate(movie.overview, 150);
  });

function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// RECENTLY WATCHED
document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById("intro-video");
  const container = document.getElementById("intro-video-container");

  if (intro) {
    intro.addEventListener("ended", () => {
      container.style.display = "none";
    });
  }

  // ⬇ Your existing code here:
  recentBtn?.addEventListener("click", () => {
    fetch("/recently-watched")
      .then(res => res.json())
      .then(data => {
        console.log("✅ Recently Watched Response:", data); // ✅ ADD THIS

        const headrow = document.getElementById("headrow");
        headrow.innerHTML = "";
        createSearchResultsRow("Recently Watched", data);
      })
      .catch(err => {
        console.error("❌ Could not fetch watched history:", err);
      });
  });

  function createRow(titleText, fetchURL, isLarge = false) {
  fetch(fetchURL)
    .then((res) => res.json())
    .then((data) => {
      const headrow = document.getElementById("headrow");

      const row = document.createElement("div");
      row.className = "row";

      const title = document.createElement("h2");
      title.className = "row_title";
      title.innerText = titleText;

      const row_posters = document.createElement("div");
      row_posters.className = "row_posters";
  