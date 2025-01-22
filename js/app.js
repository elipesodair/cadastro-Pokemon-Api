const fetchPokemon = () => {
  const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

  const pokemonPromises = [];

  // Faz o fetch dos primeiros 6 Pokémons
  for (let i = 1; i <= 6; i++) {
    pokemonPromises.push(fetch(getPokemonUrl(i)).then((response) => response.json()));
  }

  Promise.all(pokemonPromises).then((pokemons) => {
    const lisPokemons = pokemons
      .map((pokemon) => {
        const types = pokemon.types.map((typeInfo) => typeInfo.type.name).join(' | ');
        return `
          <li class="card">
            <img class="card-image ${pokemon.types[0].type.name}" 
                 alt="${pokemon.name}" 
                 src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
            <h2 class="card-title">${pokemon.name}</h2>
            <p class="card-subtitle">${types}</p>
          </li>
        `;
      })
      .join('');

    // Insere os Pokémons na lista
    const ul = document.querySelector('[data-js="pokedex"]');
    ul.innerHTML = lisPokemons;

    // Adiciona evento ao botão "Salvar"
    const btnSubmit = document.getElementById('btn-submit');
    btnSubmit.addEventListener('click', () => {
      const inputNome = document.getElementById('addNomePokemon').value;
      const inputTipo = document.getElementById('addTipoPokemon').value;
      const inputFoto = document.getElementById('addFotoPokemon').value;

      if (inputNome && inputTipo && inputFoto) {
        const liNova = document.createElement('li');
        liNova.classList.add('card');
        liNova.innerHTML = `
          <img class="card-image" alt="${inputNome}" src="${inputFoto}" />
          <h2 class="card-title">${inputNome}</h2>
          <p class="card-subtitle">${inputTipo}</p>
        `;
        ul.appendChild(liNova);

        // Limpa os campos do formulário
        document.getElementById('addNomePokemon').value = '';
        document.getElementById('addTipoPokemon').value = '';
        document.getElementById('addFotoPokemon').value = '';
      } else {
        alert('Por favor, preencha todos os campos!');
      }
    });
  });
};

// Chama a função para buscar os Pokémons
fetchPokemon();
