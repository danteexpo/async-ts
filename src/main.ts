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
    const data: Pokemon = await res.json();
    return data.name;
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

// Understanding Async/Await in TypeScript
type PokemonList = {
  count: number;
  next: string;
  previous: null;
  results: {
    name: string;
    url: string;
  }[];
};

type Pokemon = {
  id: number;
  name: string;
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
};

const getPokemonList = async (): Promise<PokemonList> => {
  const PokemonListResponse = await fetch('https://pokeapi.co/api/v2/pokemon');
  return await PokemonListResponse.json();
};

const getPokemon = async (list: PokemonList, id: number): Promise<Pokemon> => {
  const PokemonResponse = await fetch(list.results[id - 1].url);
  return await PokemonResponse.json();
};

const pokeFunction = async () => {
  try {
    const list = await getPokemonList();
    const pokemon = await getPokemon(list, 10);

    console.log(pokemon.name);
  } catch (err) {
    console.log(err);
  }
};

pokeFunction();
