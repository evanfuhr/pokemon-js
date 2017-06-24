import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../pokemon';
import { Type } from '../type';
import { TypeService } from '../type.service';

@Component({
  selector: 'app-pokemon-display',
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
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>
      this.pokemonID = params['id']
    );

    this.getTypes(this.pokemonID);

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

  goBack(): void {
    this.location.back();
  }

}
