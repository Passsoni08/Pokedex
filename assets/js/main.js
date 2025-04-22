
//then = quando der certo executar função 
//catch = erro
//finally = finalmente
//Fetch retorna uma promisse, sendo importante para lidar
//com assincronismo


function convertPokemonToLi(pokemon) {
    return `
             <li class="pokemon">

                <span class="number">#001</span>
                <span class="name">Bulbasaur</span>

                <div class="detail">
                    <ol class="types">
                        <li class="type">grass</li>
                        <li class="type">poison</li>
                    </ol>


                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                        alt="Bulbasaur">
                </div>


            </li>

    `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
})



