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

      data.results.forEach((movie) => {
        const poster = document.createElement("img");
        poster.className = isLarge ? "row_posterLarge" : "row_poster";
        poster.src = `${img_url}${movie.poster_path || movie.backdrop_path}`;
        poster.alt = movie.name || movie.title;
        poster.addEventListener("click", () => handleMovieClick(movie));
        row_posters.appendChild(poster);
      });

      row.appendChild(title);
      row.appendChild(row_posters);
      headrow.appendChild(row);
    });
 }

 window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("active", window.scrollY > 50);
  });
  
  createRow("Netflix Originals", requests.fetchNetflixOriginals, true);
  createRow("Trending Now", requests.fetchTrending);
  createRow("Action Movies", requests.fetchActionMovies);
  createRow("Comedy Movies", requests.fetchComedyMovies);
  createRow("Horror Movies", requests.fetchHorrorMovies);
  createRow("Romance Movies", requests.fetchRomanceMovies);
  createRow("Documentaries", requests.fetchDocumentaries);

  function handleMovieClick(movie) {
  const query = movie.title || movie.name || movie.original_title;
  const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + ' official trailer')}&key=******************api_requiredtype=video&maxResults=1`;

  fetch(searchURL)
    .then(res => res.json())
    .then(data => {
      if (data.items.length > 0) {
        const videoId = data.items[0].id.videoId;

        // Remove existing trailer if present
        const oldTrailer = document.getElementById("trailer-inline");
        if (oldTrailer) oldTrailer.remove();

        // Create new inline trailer
        const trailerDiv = document.createElement("div");
        trailerDiv.id = "trailer-inline";
        trailerDiv.innerHTML = `
          <div class="trailer-center" style="
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background: rgba(0,0,0,0.9);
            z-index: 9999;
          ">
            <iframe width="800" height="450" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>
            <span id="close-trailer" style="
              position: absolute;
              top: 20px;
              right: 30px;
              font-size: 32px;
              color: white;
              cursor: pointer;
              font-weight: bold;
            ">&times;</span>
          </div>
        `;

        document.body.appendChild(trailerDiv);
        document.body.classList.add("modal-open");

        // Close trailer
        document.getElementById("close-trailer").onclick = () => {
          trailerDiv.remove();
          document.body.classList.remove("modal-open");
        };

        
        // ✅ Store watched movie
        // ✅ Correctly formatted fetch to /watched
      fetch("/watched", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie }),
      })
        .then(res => {
            if (!res.ok) throw new Error("Failed to save watched movie");

            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              return res.json();
            }
            return { success: true }; // fallback
          })
          .then(() => {
          console.log("✅ Watched movie stored");
        })
      