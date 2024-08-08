// Carrousel elements:
const topRatedImages = document.getElementsByClassName("carrousel_container top-rated").item(0).getElementsByTagName("img");
const animeImages = document.getElementsByClassName("carrousel_container anime").item(0).getElementsByTagName("img");
const horrorImages = document.getElementsByClassName("carrousel_container horror").item(0).getElementsByTagName("img");
const musicalImages = document.getElementsByClassName("carrousel_container musical").item(0).getElementsByTagName("img");

const mapImage = {
    topRated: topRatedImages,
    anime: animeImages,
    horror: horrorImages,
    musical: musicalImages
};

/*
Move next/previous sliders functions.
Swap the position of an image on the last or the first carrousel's spot.

@param: Carrousel of each category.
*/
const movePrevious = (imageType) => {
    const imageList = mapImage[imageType];
    const lastImage = imageList[imageList.length - 1];
    lastImage.parentNode.insertBefore(lastImage, imageList[0]);
};

const moveNext = (imageType) => {
    const imageList = mapImage[imageType];
    const firstImage = imageList[0];
    const lastImage = imageList[imageList.length - 1];
    firstImage.parentNode.insertBefore(firstImage, lastImage.nextSibling);
};

// Top rated movies slide:
document.querySelector(".button_best_left").addEventListener("click", () => movePrevious("topRated"));
document.querySelector(".button_best_right").addEventListener("click", () => moveNext("topRated"));

// Anime slide:
document.querySelector(".button_anime_left").addEventListener("click", () => movePrevious("anime"));
document.querySelector(".button_anime_right").addEventListener("click", () => moveNext("anime"));

// Horror movies slide:
document.querySelector(".button_horror_left").addEventListener("click", () => movePrevious("horror"));
document.querySelector(".button_horror_right").addEventListener("click", () => moveNext("horror"));

// Musical movies slide:
document.querySelector(".button_musical_left").addEventListener("click", () => movePrevious("musical"));
document.querySelector(".button_musical_right").addEventListener("click", () => moveNext("musical"));