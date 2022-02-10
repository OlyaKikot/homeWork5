import apiService from "./api.js";
import renderer from "./renderer.js";

const refs = {
  form: document.querySelector(".search-form"),
  gallery: document.querySelector(".gallery"),
};

refs.form.firstElementChild.focus();
refs.form.onsubmit = onSubmit;
refs.gallery.onclick = async (e) => {
  renderer.showInfoLoader();
  const a = await apiService.fetchPokemon(e.target.innerText || e.target.name);
  renderer.addMarkup(a);
};

async function onSubmit(el) {
  el.preventDefault();
  const searchQuery = el.target.firstElementChild.value;
  renderer.addMarkup();
  const newQuery = searchQuery.trim();
  if (newQuery === "") {
    alert("Empty query");
    return;
  }
  const pattern = /^[0-9]*[-][0-9]*$/;
  if (!pattern.test(newQuery)) {
    alert("Wrong query, use `number-number`");
    return;
  }

  renderer.showGalleryLoader();
  const data = await apiService.fetchPokemons(searchQuery);
  const all = data.map(async (item, index) => {
    const prom = apiService.fetchPokemon(item.name);
    item.img = (await prom).img;
    return prom;
  });
  await Promise.all(all);
  renderer.renderMarkup(data);
}
