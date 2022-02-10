class ApiService {
  constructor() {
    this.searchQuery = "";
    this.limit = 10;
    this.offset = 10;
    this.isLoading = false;
  }

  async fetchPokemons(searchQuery) {
    let from = Number(searchQuery.substring(0, searchQuery.indexOf("-")));
    let to = Number(searchQuery.substring(searchQuery.indexOf("-") + 1));
    if (from > to) {
      const tmp = from;
      from = to;
      to = tmp;
    }
    this.limit = to - from;
    this.offset = from;

    const result = await this.asyncFetchPokemons();
    return result.results;
  }

  async fetchPokemon(searchName) {
    this.isLoading = true;
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchName} `
      );
      const pokemon = await response.json();

      const { id, height, weight, name } = pokemon;
      const img = pokemon?.sprites?.front_default;
      this.isLoading = false;
      return { id, height, weight, name, img };
    } catch (err) {
      alert(err);
    }
  }

  async asyncFetchPokemons() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`
      );
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
}

export default new ApiService();
