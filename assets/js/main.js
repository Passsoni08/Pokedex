//then = quando der certo executar função 
//catch = erro
//finally = finalmente
//Fetch retorna uma promisse, sendo importante para lidar com assincronismo

const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151 //quantidade total de pokemons
const limit = 10 //quantidade a ser mostrado por página
let offset = 0;

function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type} ">${type} </li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml //Usando concatenação para não substituir o HTML
    })

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    //Regra de Paginação
    if(qtdRecordNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        //remove o botão quando a condição for verdadeira
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    }else {
        loadPokemonItens(offset, limit)
    }
    
})


