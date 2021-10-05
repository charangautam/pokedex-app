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
        if(typeof pokemon === 'object') {
            return pokemonList.push(pokemon);
        } else {
            console.log('You can only add an object')
        }
    }

    function find(pokemonName) {
        let result = pokemonList.filter(pokemon => pokemon.name === pokemonName);
        console.log(result[0])
    }

    return {
        getAll,
        add,
        find
    };
}) ();

pokemonRepository.find('Bulbasaur')


pokemonRepository.getAll().forEach(function (pokemon) {
    let name = pokemon.name
    let height = pokemon.height
    if(height > 0.6) {
        document.write(`<p>${name} (${height} m) - Wow that's big </p>`)
    } else {
        document.write(`<p> ${name} (${height} m) </p>`)
    }
});






