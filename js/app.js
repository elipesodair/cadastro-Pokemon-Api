const fetchPokemon = () => {
    const getPoquemonurl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i = 1; i <= 6; i++) {
        pokemonPromises.push(fetch(getPoquemonurl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises)
        .then(pokemons => {

            const lisPokemos = pokemons.reduce((accumutator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumutator += `
                <li class="card">
                    <img class="card-image ${types[0]}" alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                    <h2 class="card-title">${pokemon.name}</h2>
                    <p class="card-subtitle">${types.join(' | ')}</P>
                </li>
                `
                return accumutator

            }, '')

            var btnSubmit = document.getElementById("btn-submit");
            var listaCompleta = document.querySelector("#listaCompleta");
            var itensLista = document.getElementsByClassName("pokedex");
            var inputNome1 = document.getElementById("addNomePokemon");
            var inputTipo1 = document.getElementById("addTipoPokemon");
            var inputFoto1 = document.getElementById("addFotoPokemon");

            var listaOk = itensLista

            btnSubmit.addEventListener("click", function () {
                var inputNome = document.getElementById("addNomePokemon").value;
                var inputTipo = document.getElementById("addTipoPokemon").value;
                var inputFoto = document.getElementById("addFotoPokemon").value;
                if (inputNome !== "") {
                    var liNova = document.createElement("li");
                    liNova.classList.add("card");
                    var img = document.createElement('img');
                    var h2 = document.createElement('h2');
                    var p = document.createElement('p');
                    img.classList.add("card-image");
                    img.setAttribute('src', inputFoto)
                    h2.classList.add("card-title");
                    h2.textContent = inputNome;
                    p.classList.add("card-subtitle");
                    p.textContent = inputTipo;
                    liNova.appendChild(img);
                    liNova.appendChild(h2);
                    liNova.appendChild(p);
                    listaCompleta.appendChild(liNova);
                    itensLista = document.getElementsByTagName("li");
                }
                inputNome1.value = ''
                inputTipo1.value = ''
                inputFoto1.value = ''
                listaOk = itensLista
            });

            function click(lisPokemos) {
                for (let i = 1; i <= lisPokemos.length; i++) {
                    pokemonPromises.push(fetch(getPoquemonurl(i)).then(response => response.json()))
                    if (lisPokemos[i]) {
                        lisPokemos[i].addEventListener("click", function () {
                            this.classList.toggle("done");
                        })

                    }
                }

            }
            click(listaOk);

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemos
        })

}

fetchPokemon()
