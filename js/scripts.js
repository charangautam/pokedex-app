// main IIFE function
let pokemonRepository = (function() {
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // function that shows loading message while fetching data
    function showLoadingMessage() {
        let body = document.querySelector('body');
        let message = document.createElement('h2');
        message.innerText = 'Content is loading';
        body.appendChild(message);
    }

    // function that removes loading message after fetching data
    function removeLoadingMessage() {
        let body = document.querySelector('body');
        let message = document.querySelector('h2');
        body.removeChild(message);
    }

    // function that adds pokemon objects to the pokemonList
    function add(pokemon) {
        if(typeof pokemon === 'object' && keyMatch(pokemon)) {
            return pokemonList.push(pokemon);
        } else {
            console.log('You can only add an object');
        }
    }

    // function that checks if the new pokemon object includes the same keys
    function keyMatch(pokemon) {
       return pokemon.name && pokemon.detailsURL;
    }

    // function that loads the API and extracts needed details
    function loadList() {
        showLoadingMessage()
        return fetch(apiURL).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach((item) => {
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon);
            });
            removeLoadingMessage()
        }).catch(function (err) {
            console.log(err)
            removeLoadingMessage()
        });
    }

    // function that loads wanted details in the pokemon object
    function loadDetails(pokemon) {
        showLoadingMessage()
        let url = pokemon.detailsURL;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.imgURL = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
            removeLoadingMessage()
        }).catch(function (err) {
            console.log(err)
            removeLoadingMessage()
        });
    }

    // function that displays the details of a specific pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            let modalTitle = $('.modal-title');
            modalTitle.text(pokemon.name);

            let height = $('.pokemon-height');
            let img = $('.pokemon-img');
            height.text(`Height: ${pokemon.height}`);
            img.attr('src', pokemon.imgURL);

            let typesArr = []
            let pokemonTypes = $('.pokemon-types')
            pokemon.types.forEach(item => {
                let types = item.type.name
                typesArr.push(types)
            })
            let string = typesArr.join(' & ')
            pokemonTypes.text(`Type(s): ${string}`)
        })

    }

    // function that creates the pokemon list on the webpage
    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button', 'btn', 'btn-primary')
        listItem.classList.add('group-list-item')
        button.setAttribute('data-toggle','modal')
        button.setAttribute('data-target','#targetModal')
        listItem.appendChild(button)
        list.appendChild(listItem)

        // call showDetails function upon button click 
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    // function that returns all pokemon objects from pokemonList
    function getAll() {
        return pokemonList;
    }

    // function that searches for a pokemon based on its name
    function find(pokemonName) {
        let result = pokemonList.filter(pokemon => pokemon.name === pokemonName);
        console.log(result[0]);
    }

    // returns all ^ functions to use outside the IIFE function
    return {
        getAll,
        find,
        addListItem,
        loadList,
    };
}) ();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon)
    });
});

$(document).ready(function(){
    $('#search-input').on('keyup', function() {
      var value = $(this).val().toLowerCase();
      $('.pokemon-list .group-list-item').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
});




