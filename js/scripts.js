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
        let message = document.querySelector('h2')
        body.removeChild(message)
    }

    // function that returns all pokemon objects from pokemonList
    function getAll() {
        return pokemonList;
    }

    // function that adds pokemon objects to the pokemonList
    function add(pokemon) {
        if(typeof pokemon === 'object' && keyMatch(pokemon)) {
            return pokemonList.push(pokemon);
        } else {
            console.log('You can only add an object')
        }
    }

    // function that checks if the new pokemon object includes the same keys
    function keyMatch(pokemon) {
        if(Object.keys(pokemon).includes('name') ||
            Object.keys(pokemon).includes('height')
        ) {
            return true
        } else {
            return false
        }
    }

    // function that searches for a pokemon based on its name
    function find(pokemonName) {
        let result = pokemonList.filter(pokemon => pokemon.name === pokemonName);
        console.log(result[0]);
    }

    // function that displays the details of a specific pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon.name, pokemon.height, pokemon.imgURL);
        })

    }

    // function that creates the pokemon list on the webpage
    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button')
        listItem.appendChild(button)
        list.appendChild(listItem)

        // call showDetails function upon button click 
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
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

    // all functions related to the modal details are below this

    let modalContainer = document.querySelector('#modal-container');

    function showModal(name, height, img) {
        // Clear all existing modal content
        modalContainer.innerHTML = '';
        
        let modal = document.createElement('div');
        modal.classList.add('modal');
        
        // Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);
        
        let nameElement = document.createElement('h1');
        nameElement.innerText = name;
        
        let heightElement = document.createElement('p');
        heightElement.innerText = `Height: ${height}`;

        let imgElement = document.createElement('img');
        imgElement.src = img;
        
        modal.appendChild(closeButtonElement);
        modal.appendChild(nameElement);
        modal.appendChild(heightElement);
        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);
        
        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });
      
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    // returns all ^ functions to use outside the IIFE function
    return {
        getAll,
        add,
        find,
        addListItem,
        loadList,
        loadDetails
    };
}) ();

pokemonRepository.find('Bulbasaur')

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon)
    });
});








