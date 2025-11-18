let pokemonRepository = (function () {
  let e = [],
    t = document.querySelector("#modal-container");
  function n(t) {
    var n;
    (n = t), "object" == typeof n && n.name && e.push(t);
  }
  function o() {
    return e;
  }
  function i(t) {
    Array.isArray(t) ? e.forEach(n) : n(t);
  }
  function a() {
    t.classList.remove("is-visible");
  }
  return (
    window.addEventListener("keydown", (e) => {
      "Escape" === e.key && t.classList.contains("is-visible") && a();
    }),
    {
      getAll: o,
      add: i,
      addToList: function e(t) {
        let n = document.querySelector(".pokemon-list"),
          o = document.createElement("li"),
          i = document.createElement("button");
        (i.innerText = t.name),
          i.classList.add("pokemon-button"),
          i.classList.add("list-group-item"),
          i.classList.add("btn"),
          o.appendChild(i),
          n.appendChild(o),
          i.addEventListener("click", function () {
            (function e(t) {
              pokemonRepository.loadDetails(t).then(function () {
                let e = document.getElementById("modal-image");
                (e.src = t.imageUrl), (e.alt = t.name);
                document.getElementById("pokemonModalLabel").innerText = t.name;
                (document.getElementById("modal-height").innerText =
                  "Height: " + t.height),
                  $("#pokemonModal").modal("show");
              });
            })(t);
          });
      },
      loadList: function e() {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            e.results.forEach(function (e) {
              i({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      loadDetails: function e(t) {
        return fetch(t.detailsUrl)
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            (t.imageUrl = e.sprites.front_default),
              (t.height = e.height),
              (t.types = e.types);
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      hideModal: a,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addToList(e);
  });
});
