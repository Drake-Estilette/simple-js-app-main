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
// ... add more Pokémon as needed

// Loop through the array and print each Pokémon's name
for (let ind = 0; ind < pokemonList.length; ind++) {
  // Check if the height is greater than 1 meter
  if (pokemonList[ind].height > 1) {
    // If true, print the name with a special message
    document.write(pokemonList[ind].name + " - Wow that's big!" + "<br>");
  } else {
    document.write(pokemonList[ind].name + "<br>");
  }
}
