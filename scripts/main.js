/*
Fetch movies functions

@param : {object} movies elements from each category.
*/
const fetchBestMovie = async (movie) => {
    movie["details"] = await fetch(movie["url"])
        .then(response => response.json());

    // Dynamic image creation with the corresponding source.
    let bestImage = document.createElement("img");
    bestImage.src = movie["details"].results[0].image_url;
    bestImage.id = movie["details"].results[0].id;
    movie["image"].appendChild(bestImage);

    // Open/close modals functions calls.
    movie["button"].addEventListener("click", () => openModal(bestImage.id));
    closeModalButton.addEventListener("click", closeModal);
    movie["title"][0].innerHTML = movie["details"].results[0].title;

    updateBestMovieDescription(bestImage.id);
};

const updateBestMovieDescription = async (id) => {
    let movieDetail = await fetch("http://localhost:8000/api/v1/titles/" + id)
        .then(response => response.json());

    bestMovie["description"][0].innerHTML = movieDetail.description;
};

const fetchMovies = async (movies) => {
    movies["details"] = await fetch(movies["url"])
        .then(response => response.json());

    // Separate the best movie from the rest.
    if (movies === topRatedMovies) {
        movies["details"].results.shift();
    }

    // Dynamically create images inside the carousel of each movie category.
    for (let i = 0; i < 7; i++) {
        let newImage = document.createElement("img");
        newImage.src = movies["details"].results[i].image_url;
        newImage.id = movies["details"].results[i].id;
        movies["carrousel"].appendChild(newImage);
        newImage.addEventListener("click", () => openModal(newImage.id));
        closeModalButton.addEventListener("click", closeModal);
    }
};

/*
Open Modal function.

@param : {string} ID of each movie from the click event :
Fetch call the movie ID and add its details inside the modal.
*/
const openModal = async (id) => {
    let movieDetails = await fetch("http://localhost:8000/api/v1/titles/" + id)
        .then(response => response.json());

    modal.style.display = "block";

    // Insert movie details inside the modal.
    modalElements["title"].innerHTML = movieDetails.original_title;
    modalElements["image"].src = movieDetails.image_url;
    modalElements["description"].innerHTML = `${movieDetails.long_description}<br><br><strong>Actors :</strong> ${movieDetails.actors}`;
    modalElements["date"].innerHTML = movieDetails.date_published;
    modalElements["duration"].innerHTML = displayDuration(movieDetails.duration);
    modalElements["rated"].innerHTML = movieDetails.rated;
    modalElements["imdbScore"].innerHTML = `${movieDetails.imdb_score}\n&#11088`;
    modalElements["directors"].innerHTML = `Directors : ${movieDetails.directors}`;
    modalElements["actors"].innerHTML = movieDetails.genres;
    modalElements["countries"].innerHTML = movieDetails.countries;
    modalElements["boxOffice"].innerHTML = `Gross income : ${new Intl.NumberFormat("en-us", { style: "currency", currency: "USD" }).format(movieDetails.worldwide_gross_income)}`;
};

// Display the movie duration with the 0h0m format.
const displayDuration = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let minute = minutes % 60;
    return `${hours}h${minute}m`;
};

const closeModal = () => {
    modal.style.display = "none";
};

fetchBestMovie(bestMovie);
fetchMovies(topRatedMovies);
fetchMovies(animeMovies);
fetchMovies(horrorMovies);
fetchMovies(musicalMovies);
