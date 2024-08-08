// API Url for each movie, sorted by at least 8.3 minimum IMDb score.
const moviesApi = "http://localhost:8000/api/v1/titles/?imdb_score_min=8.3&page_size=100&sort_by=-imdb_score";

// Modal elements:
let modal = document.getElementsByClassName("modal")[0];
let closeModalButton = document.getElementsByClassName("close_button")[0];
let modalElements = {
    title: modal.getElementsByTagName("h2")[0],
    description: modal.getElementsByClassName("modal_description")[0],
    image: modal.getElementsByClassName("modal_body").item(0).getElementsByTagName("img")[0],
    date: modal.getElementsByClassName("modal_header").item(0).getElementsByTagName("p")[0],
    duration: modal.getElementsByClassName("modal_header").item(0).getElementsByTagName("span")[1],
    rated: modal.getElementsByClassName("modal_footer").item(0).getElementsByTagName("p")[0],
    imdbScore: modal.getElementsByClassName("modal_footer").item(0).getElementsByTagName("p")[1],
    directors: modal.getElementsByClassName("modal_footer").item(0).getElementsByTagName("p")[2],
    actors: modal.getElementsByClassName("modal_footer").item(0).getElementsByTagName("p")[3],
    countries: modal.getElementsByClassName("modal_footer").item(0).getElementsByTagName("p")[4],
    boxOffice: modal.getElementsByClassName("modal_footer").item(0).getElementsByTagName("p")[5]
};

// Each movie category:
let bestMovie = {
    url: moviesApi.replace("imdb_score_min=8.3", "imdb_score_min=9.6"),
    image: document.getElementsByClassName("best_movie_image").item(0),
    title: document.getElementsByClassName("best_movie_description").item(0).getElementsByTagName("h2"),
    description: document.getElementsByClassName("best_movie_description").item(0).getElementsByTagName("p"),
    button: document.getElementsByClassName("best_movie_description").item(0).getElementsByTagName("button")[0]
};

let topRatedMovies = {
    url: moviesApi.replace("imdb_score_min=8.3", "imdb_score_min=9.3"),
    carrousel: document.getElementsByClassName("carrousel_container top-rated").item(0)
};

let animeMovies = {
    url: `${moviesApi}&genre=Animation`,
    carrousel: document.getElementsByClassName("carrousel_container anime").item(0)
};

let horrorMovies = {
    url: `${moviesApi}&genre=Horror`,
    carrousel: document.getElementsByClassName("carrousel_container horror").item(0)
};

let musicalMovies = {
    url: `${moviesApi}&genre=Musical`,
    carrousel: document.getElementsByClassName("carrousel_container musical").item(0)
};
