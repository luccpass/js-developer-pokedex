const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <div class="pokemon-info">

                    <nav class="pokemon-info-selector">
                        <button onclick="showCard(1, this.parentElement.parentElement)">About</button>
                        <button onclick="showCard(2, this.parentElement.parentElement)">Base Stats</button>
                    </nav>

                    <div class="pokemon-info-section" id="card1">
                        <p>Height: <span>${pokemon.height}</span></p>
                        <p>Weight: <span>${pokemon.weight}</span></p>
                        <p>Abilities: <span>${pokemon.abilities}</span></p>
                    </div>

                    <div class="pokemon-info-section" id="card2">
                        <p>HP: <span>${pokemon.hp}</span></p>
                        <p>Attack: <span>${pokemon.attack}</span></p>
                        <p>Defense: <span>${pokemon.defense}</span></p>
                        <p>Sp. Atk: <span>${pokemon.spAtack}</span></p>
                        <p>Sp. Def: <span>${pokemon.spDefense}</span></p>
                        <p>Speed: <span>${pokemon.speed}</span></p>
                    </div>

                </div>
            
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function showCard(cardNumber, listItem) {
    const cardElements = listItem.querySelectorAll('.pokemon-info-section');

    cardElements.forEach((card, index) => {
        if (index === cardNumber - 1) {
            if (card.style.display === 'none' || card.style.display === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        } else {
            card.style.display = 'none';
        }
    });

    const button = listItem.querySelector(`button:nth-child(${cardNumber})`);
    if (button) {
        if (button.textContent === 'Hide') {
            button.textContent = 'Show';
        } else {
            button.textContent = 'Hide';
        }
    }
}