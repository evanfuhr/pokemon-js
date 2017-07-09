import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { TypeService } from '../type.service';
import { PokemonService } from '../pokemon.service';

import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.css']
})
export class PokemonDisplayComponent implements OnInit {
  pokemon: Pokemon;
  types: Type[];
  pokemonID: string;
  spritePath = '/assets/sprites/';

  constructor(
    private typeService: TypeService,
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>
      this.pokemonID = params['id']
    );

    this.getTypes(this.pokemonID);
    this.getPokemonData(this.pokemonID);

    let spriteName = this.pokemonID + '.gif';
    if ( parseInt(this.pokemonID, 10) < 100 ) {
      if ( parseInt(this.pokemonID, 10) < 10 ) {
        spriteName = '0' + spriteName;
      }
      spriteName = '0' + spriteName;
    }
    this.spritePath = this.spritePath + 'sprite' + spriteName;
  }

  private getTypes(pokemonID): void {
    this.typeService
      .GetAllForPokemon(pokemonID)
      .subscribe((data: Type[]) => this.types = data,
        error => console.log(error),
        () => console.log('Types set.'));
  }

  private getPokemonData(pokemonID): void {
    this.pokemonService
      .GetSingle(pokemonID)
      .subscribe((data: Pokemon) => this.pokemon = data,
        error => console.log(error),
        () => console.log('Pokemon data set.'));
  }

  goBack(): void {
    this.location.back();
  }

}
