// list of pokemons 

pokemonList = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']}, 
    {name: 'Charmander', height: 0.6, types: ['fire']},
    {name: 'Squirtle', height: 0.5, types: ['water']}
]

pokemonList.forEach(function (pokemon) {
    let name = pokemon.name
    let height = pokemon.height
    if(height > 0.6) {
        document.write(`<p>${name} (${height} m) - Wow that's big </p>`)
    } else {
        document.write(`<p> ${name} (${height} m) </p>`)
    }
})

