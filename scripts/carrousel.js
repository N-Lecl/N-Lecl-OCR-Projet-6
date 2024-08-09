// Éléments du carrousel :
// Récupère les images des différents carrousels en fonction de leur catégorie
const topRatedImages = document.getElementsByClassName("carrousel_container top-rated").item(0).getElementsByTagName("img");
const animeImages = document.getElementsByClassName("carrousel_container anime").item(0).getElementsByTagName("img");
const horrorImages = document.getElementsByClassName("carrousel_container horror").item(0).getElementsByTagName("img");
const musicalImages = document.getElementsByClassName("carrousel_container musical").item(0).getElementsByTagName("img");

// Crée un objet qui associe chaque catégorie à sa liste d'images correspondante
const mapImage = {
    topRated: topRatedImages,
    anime: animeImages,
    horror: horrorImages,
    musical: musicalImages
};

/*
Fonctions pour déplacer les images du carrousel vers la gauche ou la droite.
Les fonctions échangent la position de la première ou de la dernière image du carrousel.

@param: imageType - la catégorie du carrousel (ex: "topRated", "anime", "horror", "musical").
*/

// Fonction pour déplacer l'image vers la gauche (précédente)
const movePrevious = (imageType) => {
    const imageList = mapImage[imageType];
    const lastImage = imageList[imageList.length - 1];
    lastImage.parentNode.insertBefore(lastImage, imageList[0]);
};

// Fonction pour déplacer l'image vers la droite (suivante)
const moveNext = (imageType) => {
    const imageList = mapImage[imageType];
    const firstImage = imageList[0];
    const lastImage = imageList[imageList.length - 1];
    firstImage.parentNode.insertBefore(firstImage, lastImage.nextSibling);
};

// Déplace les images du carrousel des films les mieux notés ("topRated") vers la gauche ou la droite :
document.querySelector(".button_best_left").addEventListener("click", () => movePrevious("topRated"));
document.querySelector(".button_best_right").addEventListener("click", () => moveNext("topRated"));

// Déplace les images du carrousel des films d'animation ("anime") vers la gauche ou la droite :
document.querySelector(".button_anime_left").addEventListener("click", () => movePrevious("anime"));
document.querySelector(".button_anime_right").addEventListener("click", () => moveNext("anime"));

// Déplace les images du carrousel des films d'horreur ("horror") vers la gauche ou la droite :
document.querySelector(".button_horror_left").addEventListener("click", () => movePrevious("horror"));
document.querySelector(".button_horror_right").addEventListener("click", () => moveNext("horror"));

// Déplace les images du carrousel des films musicaux ("musical") vers la gauche ou la droite :
document.querySelector(".button_musical_left").addEventListener("click", () => movePrevious("musical"));
document.querySelector(".button_musical_right").addEventListener("click", () => moveNext("musical"));