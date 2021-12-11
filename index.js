//Fetch Data
const fetchData = async (search) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=7758ee1c&s=${search}`
    );
    const movies = await response.json();
    if (movies.Error) {
      return [];
    }
    return movies.Search;
  } catch (error) {
    console.error(error);
  }
};

//Handle input data
const input = document.querySelector("input");
const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("input");
const autoComBox = document.querySelector(".autocom-box");

//Create search results
const onInput = async (event) => {
  let movies = await fetchData(event.target.value);

  autoComBox.innerHTML = "";
  searchWrapper.classList.remove("active");
  for (let movie of movies) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const p = document.createElement("p");

    if (movie.Poster === "N/A") {
      img.src = "";
    } else {
      img.src = movie.Poster;
    }
    img.classList.add("movie-img");
    p.innerText = `${movie.Title}`;
    a.append(img, p);
    li.append(a);

    a.classList.add("movie-div");
    autoComBox.append(li);
    searchWrapper.classList.add("active");
    allA = document.querySelectorAll("a");

    a.addEventListener("click", function () {
      searchWrapper.classList.remove("active");
      input.value = movie.Title;
      return onMovieSelect(movie);
    });
  }
};

//Handle clicks outside search results
const searchIcon = document.querySelector(".search");
const wrapper = document.querySelector(".wrapper");

document.addEventListener("click", function (e) {
  if (!wrapper.contains(e.target)) {
    searchWrapper.classList.remove("active");
  }
});

searchIcon.addEventListener("click", function () {
    searchWrapper.classList.add("active");
});

input.addEventListener("input", debounce(onInput, 800));


const onMovieSelect = async (movie) => {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=7758ee1c&i=${movie.imdbID}`
    );
    const results = await response.json();
    const summary = document.querySelector('.summary')
    summary.innerHTML = movieTemplate(results)
    console.log(results);
    console.log(`selected ${movie.Title}`);
  } catch (error) {
      console.error(error)
  }
};

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="media-details">
            <h3 class="title">Awards</h3>
            <p class="subtitle">${movieDetail.Awards}</p>
        </article>
        <article class="media-details">
            <h3 class="title">Box Office</h3>
            <p class="subtitle">${movieDetail.BoxOffice}</p>
        </article>
        <article class="media-details">
            <h3 class="title">Metascore</h3>
            <p class="subtitle">${movieDetail.Metascore}</p>
        </article>
        <article class="media-details">
            <h3 class="title">Imdb Rating</h3>
            <p class="subtitle">${movieDetail.imdbRating}</p>
        </article>
        <article class="media-details">
            <h3 class="title">Imdb Votes</h3>
            <p class="subtitle">${movieDetail.imdbVotes}</p>
        </article>
    `
}
