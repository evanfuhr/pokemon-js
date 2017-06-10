import { Component, OnInit } from '@angular/core';
import {Pokemon} from '../pokemon';

import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  providers: [PokemonService],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
    console.log(JSON.stringify(this.pokemons));
  }

  private getPokemons(): void {
    this.pokemonService
      .GetAll()
      .subscribe((data: Pokemon[]) => this.pokemons = data,
        error => console.log(error),
        () => console.log('Get all Pokemons complete'));
  }
}
