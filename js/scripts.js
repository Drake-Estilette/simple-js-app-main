let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");

  function addSingle(item) {
    if (validate(item)) {
      pokemonList.push(item);
    }
  }
  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    if (Array.isArray(pokemon)) {
      pokemonList.forEach(addSingle);
    } else {
      addSingle(pokemon);
    }
  }
  function validate(item) {
    return typeof item === "object" && item.name;
  }
  function addToList(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    button.classList.add("list-group-item");
    button.classList.add("btn");
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  // Fetches the list of Pokémon from the API and adds them to the repository
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let modalImage = document.getElementById("modal-image");
      modalImage.src = pokemon.imageUrl;
      modalImage.alt = pokemon.name;
      let modalTitle = document.getElementById("pokemonModalLabel");
      modalTitle.innerText = pokemon.name;
      let modalHeight = document.getElementById("modal-height");
      modalHeight.innerText = "Height: " + pokemon.height;
      $("#pokemonModal").modal("show");
    });
  }
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });
  return {
    getAll: getAll,
    add: add,
    addToList: addToList,
    loadList: loadList,
    loadDetails: loadDetails,
    hideModal: hideModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addToList(pokemon);
  });
});
