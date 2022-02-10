import apiService from "./api.js";

const refs = {
  gallery: document.querySelector(".gallery"),
  info: document.querySelector(".info"),
};

function renderMarkup(arr) {
  const markUp =
    "<ul class='list'>" +
    arr
      .map(
        (item) =>
          `<li class='item'><span class="span">${item.name}</span><img class="img" src="${item.img}" name="${item.name}" width="150" height=auto></li>`
      )
      .join("") +
    "</ul>";
  refs.gallery.innerHTML = markUp;
}

function addMarkup(pokemon) {
  if (!pokemon) {
    refs.info.innerHTML = "";
    return;
  }
  const { id, height, weight, name, img } = pokemon;
  const markUp = ` <img class="imgMarkup" src="${img}" width="150" height=auto ><div class="containerMarkup"><span class="text">name: ${name}</span><span class="text">id: ${id}</span><span class="text">height: ${height}</span><span class="text">wight: ${weight}</span><div>`;
  refs.info.innerHTML = markUp;
}

function showInfoLoader() {
  const markUp = `<img class="loader"  src="./loader.gif" width="300" height="300">`;
  refs.info.innerHTML = markUp;
}

function showGalleryLoader() {
  const markUp = `<img class="loader" src="./loader.gif" width="300" height="300">`;
  refs.gallery.innerHTML = markUp;
}

export default { renderMarkup, addMarkup, showInfoLoader, showGalleryLoader };
