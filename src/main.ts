import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

// Understanding Promises
const loadRandom = new Promise((resolve, reject) => {
  const random = Math.random();
  if (random < 0.5) {
    resolve(random);
  } else {
    reject('Error');
  }
});

loadRandom
  .then((random) => console.log(random))
  .catch((error) => console.error(error));

// Understanding Async / Await
const loadPokemon = async (id: number) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (res.status === 404) {
      return 'Not Found!';
    }
    const data = res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

console.log(await loadPokemon(4));

// Understanding Promise.All
const loadPokemons = async (maxIndex: number) => {
  // SLOW!!! BECAUSE IT'S WAITING FOR EVERY REQUEST
  // const pokemons = [];
  // for (let i = 1; i <= maxIndex; i++) {
  //   pokemons.push(await loadPokemon(i));
  // }
  // return pokemons;

  // FAST!!!
  const pokemonPromises = [];
  for (let i = 1; i <= maxIndex; i++) {
    pokemonPromises.push(loadPokemon(i));
  }
  return Promise.all(pokemonPromises);
};

console.log(await loadPokemons(5));
