const charContainer = document.querySelector('.chars-container');
const locContainer = document.querySelector('.locs-container');
const epContainer = document.querySelector('.eps-container');

const API = 'https://rickandmortyapi.com/api';
const defaultFilters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1
};

async function getCharacters({ name, species, gender, status, page = 1 }) {
    const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);
    const characters = await response.json();
    return characters.results;
}

async function getLocations(page = 1) {
    const response = await fetch(`${API}/location?page=${page}`);
    const locations = await response.json();
    return locations.results;
}

async function getEpisodes(page = 1) {
    const response = await fetch(`${API}/episode?page=${page}`);
    const episodes = await response.json();
    return episodes.results;
}

function renderCharacters(characters) {
    charContainer.innerHTML = ''; // Limpa o container antes de renderizar
    characters.forEach((character) => {
        charContainer.innerHTML += `
            <div class="char">
                <img src="${character.image}" alt="${character.name}">
                <div class="char-info">
                    <h3>${character.name}</h3>
                    <span>${character.species}</span>
                </div>
            </div>
        `;
    });
}

function renderLocations(locations) {
    locContainer.innerHTML = ''; // Limpa o container antes de renderizar
    locations.forEach((location) => {
        locContainer.innerHTML += `
            <div class="loc">
                <h3>${location.name}</h3>
                <span>${location.type}</span>
                <span>${location.dimension}</span>
            </div>
        `;
    });
}

function renderEpisodes(episodes) {
    epContainer.innerHTML = ''; // Limpa o container antes de renderizar
    episodes.forEach((episode) => {
        epContainer.innerHTML += `
            <div class="ep">
                <h3>${episode.name}</h3>
                <span>${episode.episode}</span>
                <span>${episode.air_date}</span>
            </div>
        `;
    });
}

// Função para buscar e renderizar personagens
async function fetchAndRenderCharacters(filters = defaultFilters) {
    const characters = await getCharacters(filters);
    renderCharacters(characters);
}

// Exemplo de uso
fetchAndRenderCharacters();
