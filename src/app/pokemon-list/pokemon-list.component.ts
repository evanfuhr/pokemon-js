import { Component, OnInit, Input } from '@angular/core';
import {Pokemon} from '../pokemon';

import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  title = 'app works!';
  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) { }

  getPokemons(): void {
    this.pokemonService.getPokemons().then(pokemons => this.pokemons = pokemons);
  }

  ngOnInit(): void {
    this.getPokemons();
  }
}
