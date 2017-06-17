import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Type } from '../type';

import { PokemonService } from '../pokemon.service';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-pokemon-list',
  providers: [PokemonService],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService, private typeService: TypeService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  private getPokemons(): void {
    this.pokemonService
      .GetAll()
      .subscribe((data: Pokemon[]) => this.pokemons = data,
        error => console.log(error),
        () => console.log('Get all pokemons complete'));
  }
}
