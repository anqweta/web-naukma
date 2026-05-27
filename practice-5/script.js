const pokemonList = [];
const pokemonLiked = JSON.parse(localStorage.getItem('likedPokemon')) || [];
const pokemonContainer = document.querySelector('.container__cards');
const buttonNext = document.querySelector('.next');
const buttonPrev = document.querySelector('.prev');
let offset = 0;


fetchData();

/*buttonLike.addEventListener('click', () => {
    const currentCard = buttonLike.closest('.card');
    if (currentCard) {
        if (!currentCard.classList.contains('liked')) {
            currentCard.classList.toggle('liked');
            const pokemonName = currentCard.dataset.name;
            const likedPokemon = pokemonList.find(pokemon => pokemon.name === pokemonName);
            pokemonLiked.push(likedPokemon);
            localStorage.setItem('likedPokemon', JSON.stringify(pokemonLiked));
        } else {
            currentCard.classList.remove('liked');
            const pokemonName = currentCard.dataset.name;
            const likedPokemon = pokemonLiked.find(pokemon => pokemon.name === pokemonName);
            pokemonLiked.filter(pokemon => pokemon.name !== pokemonName);
            localStorage.setItem('likedPokemon', JSON.stringify(pokemonLiked));
        }
    }
}); */

buttonNext.addEventListener('click', () => {
    offset += 20;
    fetchData();
});

buttonPrev.addEventListener('click', () => {
    offset = Math.max(0, offset - 20);
    fetchData();
});

pokemonContainer.addEventListener('click', (event) => {

    const likeButton = event.target.closest('.button-like');
    if (likeButton) {
    const currentCard = likeButton.closest('.card');
        if (!currentCard.classList.contains('liked')) {
            currentCard.classList.toggle('liked');
            likeButton.textContent = '♥';
            const pokemonName = currentCard.dataset.name;
            const likedPokemon = pokemonList.find(pokemon => pokemon.name === pokemonName);
            pokemonLiked.push(likedPokemon);
            localStorage.setItem('likedPokemon', JSON.stringify(pokemonLiked));
        } else {
            likeButton.textContent = '♡';
            currentCard.classList.remove('liked');
            const pokemonName = currentCard.dataset.name;
            const likedPokemon = pokemonLiked.find(pokemon => pokemon.name === pokemonName);
            pokemonLiked.filter(pokemon => pokemon.name !== pokemonName);
            localStorage.setItem('likedPokemon', JSON.stringify(pokemonLiked));
        }
        return;
    }
    
    const clickedCard = event.target.closest('.card');
    if (!clickedCard) {
        return; 
    }
    const pokemonName = clickedCard.dataset.name;
    const selectedPokemon = pokemonList.find(pokemon => pokemon.name === pokemonName);
        const pressCard = `
        <div class="pop-up">
         <div class="card card__press">
          <img src="${selectedPokemon.image}" loading="lazy" alt="${selectedPokemon.name}" />
          <h2 class="card__title">${selectedPokemon.name}</h2>
          <p>
            <b>Тип:</b> ${selectedPokemon.type.join(', ')}<br />
            <b>Вага:</b> ${selectedPokemon.weight} кг<br />
            <b>Зріст:</b> ${selectedPokemon.height} м<br />
            <button class="close-button">Закрити</button>
          </p>
        </div>
        </div>
        `
    document.body.insertAdjacentHTML('beforeend', pressCard);
    const closeButton = document.querySelector('.close-button');
    const popUp = document.querySelector('.pop-up');
    closeButton.addEventListener('click', (event) => {
    if (popUp) {
        popUp.remove();
    }
 });
});

async function fetchData() {
    pokemonList.length = 0;
    pokemonContainer.innerHTML = '';
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
        const data = await response.json();
        for (const pokemon of data.results) {
            const detailResponse = await fetch(pokemon.url);
            const detailData = await detailResponse.json();
            const pokemonCardInfo = {
                name: detailData.name,
                image: detailData.sprites.front_default,
                height: detailData.height,
                weight: detailData.weight,
                type: detailData.types.map(typeInfo => typeInfo.type.name)
            }
            pokemonList.push(pokemonCardInfo);
        }
        renderPokemonCard(pokemonList);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderPokemonCard(pokemon) { 
    pokemonList.forEach(pokemon => { 
        const isLiked = pokemonLiked.some(liked => liked.name === pokemon.name);
        const cardClass = isLiked ? 'card liked' : 'card';
        const heartSymbol = isLiked ? '♥' : '♡';

        const card = `
          <div class="${cardClass}" data-name="${pokemon.name}">
          <img src="${pokemon.image}" loading="lazy" alt="${pokemon.name}" />
          <h2 class="card__title">${pokemon.name}</h2>
          <button class="button-like">${heartSymbol}</button>
        </div>
        `
        pokemonContainer.insertAdjacentHTML('beforeend', card);
    });
}