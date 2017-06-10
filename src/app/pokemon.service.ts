import { Injectable } from '@angular/core';

import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';

@Injectable()
export class PokemonService {
  getPokemons(): Promise<Pokemon[]> {
    return Promise.resolve(POKEMONS);
  }
}
