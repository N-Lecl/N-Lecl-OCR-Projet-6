/*
Fonction pour récupérer les données du meilleur film.

@param : {object} movie - Éléments du meilleur film, comprenant l'URL et les éléments du DOM.
*/
const fetchBestMovie = async (movie) => {
    // Fetch des données du meilleur film depuis l'API.
    movie["details"] = await fetch(movie["url"])
        .then(response => response.json());

    // Création dynamique de l'image du meilleur film avec la source correspondante.
    let bestImage = document.createElement("img");
    bestImage.src = movie["details"].results[0].image_url;
    bestImage.id = movie["details"].results[0].id;
    movie["image"].appendChild(bestImage);

    // Appel des fonctions pour ouvrir/fermer les fenêtres popup.
    movie["button"].addEventListener("click", () => openModal(bestImage.id));
    closeModalButton.addEventListener("click", closeModal);
    movie["title"][0].innerHTML = movie["details"].results[0].title;

    // Mise à jour de la description du meilleur film.
    updateBestMovieDescription(bestImage.id);
};

/*
Fonction pour mettre à jour la description du meilleur film dans le popup.

@param : {string} id - ID du film pour récupérer ses détails.
*/
const updateBestMovieDescription = async (id) => {
    let movieDetail = await fetch("http://localhost:8000/api/v1/titles/" + id)
        .then(response => response.json());

    // Mise à jour de la description du meilleur film dans le popup.
    bestMovie["description"][0].innerHTML = movieDetail.description;
};

/*
Fonction pour récupérer les données des films et les afficher dans les carrousels.

@param : {object} movies - Éléments des films, comprenant l'URL et le conteneur du carrousel.
*/
const fetchMovies = async (movies) => {
    // Fetch des données des films depuis l'API.
    movies["details"] = await fetch(movies["url"])
        .then(response => response.json());

    // Séparer le meilleur film du reste (uniquement pour les films les mieux notés).
    if (movies === topRatedMovies) {
        movies["details"].results.shift();
    }

    // Création dynamique des images dans le carrousel de chaque catégorie de films.
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
Fonction pour ouvrir la fenêtre modale avec les détails du film sélectionné.

@param : {string} id - ID du film pour récupérer ses détails et les afficher dans la modale.
*/
const openModal = async (id) => {
    let movieDetails = await fetch("http://localhost:8000/api/v1/titles/" + id)
        .then(response => response.json());

    modal.style.display = "block";

    // Insère les détails du film dans le popup.
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

/*
Fonction pour afficher la durée du film au format 0h0m.

@param : {number} minutes - Durée du film en minutes.
@return : {string} - Durée formatée en heures et minutes.
*/
const displayDuration = (minutes) => {
    let hours = Math.floor(minutes / 60);
    let minute = minutes % 60;
    return `${hours}h${minute}m`;
};

// Fonction pour fermer le popup.
const closeModal = () => {
    modal.style.display = "none";
};

// Appels des fonctions pour récupérer les données et afficher les films.
fetchBestMovie(bestMovie);
fetchMovies(topRatedMovies);
fetchMovies(animeMovies);
fetchMovies(horrorMovies);
fetchMovies(musicalMovies);
