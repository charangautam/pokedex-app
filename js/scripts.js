// list of pokemons 
let pokemonRepository = (function() {
    pokemonList = [
        {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']}, 
        {name: 'Charmander', height: 0.6, types: ['fire']},
        {name: 'Squirtle', height: 0.5, types: ['water']}
    ];

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        if(typeof pokemon === 'object' && keyMatch(pokemon)) {
            return pokemonList.push(pokemon);
        } else {
            console.log('You can only add an object')
        }
    }

    function keyMatch(pokemon) {
        if(Object.keys(pokemon).includes('name') ||
            Object.keys(pokemon).includes('height') ||
            Object.keys(pokemon).includes('name')
        ) {
            return true
        } else {
            return false
        }
    }

    function find(pokemonName) {
        let result = pokemonList.filter(pokemon => pokemon.name === pokemonName);
        console.log(result[0])
    }

    function showDetails(pokemon) {
        console.log(pokemon)
    }

    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button')
        listItem.appendChild(button)
        list.appendChild(listItem)

        button.addEventListener('click', showDetails(pokemon))
    }

    return {
        getAll,
        add,
        find,
        addListItem
    };
}) ();

pokemonRepository.find('Bulbasaur')


pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)

});








