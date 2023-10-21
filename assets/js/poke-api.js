const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  pokemon.types = types
  pokemon.type = type
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
  pokemon.height = pokeDetail.height / 10
  pokemon.weight = pokeDetail.weight / 10
  pokemon.stats = pokeDetail.stats.map((stat) => stat.base_stat)

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
      .then((response) => response.json())
      .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = function (offset = 0, limit = 5) {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  return fetch(url) //busca de pokemon
    .then((response) => response.json()) //conversão da lista para json
    .then((jsonBody) => jsonBody.results) //pega a lista de pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //transforma a lista em uma nova lista de promessa de detralhes do pokemon
    .then((detailRequests) => Promise.all(detailRequests)) //espera a lista ser resolvida
    .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemon = (pokemonId) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
 
 return fetch(url)
.then((response) => response.json())
.then(convertPokeApiDetailToPokemon)
}