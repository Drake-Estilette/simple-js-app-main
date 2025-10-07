let pokemonRepository = (function () {
  let pokemonList = [];
  // Should change this to be interactive in the future
  pokemonList[0] = {
    name: "Bulbasaur",
    height: 0.7,
    type: "Grass/Poison",
  };
  pokemonList[1] = {
    name: "Ivysaur",
    height: 1.0,
    type: "Grass/Poison",
  };
  pokemonList[2] = {
    name: "Venusaur",
    height: 2.0,
    type: "Grass/Poison",
  };
  getAll: function getAll() {
    return pokemonList;
  }
  add: function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      return "Input is not a valid Pokémon object.";
    }
  }
  function addToList(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }
  function showDetails(pokemon) {
    console.log(pokemon);
  }
  return {
    getAll: getAll,
    add: add,
    addToList: addToList,
  };
})();

// ... add more Pokémon as needed

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addToList(pokemon);
});
