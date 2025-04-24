
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){//convertendo o modelo do pokeApi para o nosso modelo
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

//Requisição de Detalhes
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())//nova lista de PROMESSAS dos detalhes dos pokemons em JSON
    .then((convertPokeApiDetailToPokemon))//detalhe convertido
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)//Foi no servidor e buscou a lista de pokemons
        .then((response) => response.json()) //transformou a lista em json
        .then((jsonBody) => jsonBody.results) //resultado da conversão em json
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //mapeando a lista de pokemons em uma nova lista de requisições dos detalhes dos pokemons (PROMESSAS)
        .then((detailRequests) => Promise.all(detailRequests))//Requisições de detalhes, esperando todas as requisições terminarem
        .then((pokemonsDetails) => pokemonsDetails)//imprime a lista de detalhes dos pokemons
}

