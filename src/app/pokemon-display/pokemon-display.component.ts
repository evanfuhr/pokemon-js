import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.css']
})
export class PokemonDisplayComponent implements OnInit {
  pokemon: Pokemon;
  pokemonID: string;
  spritePath = '/assets/sprites/';

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>
      this.pokemonID = params['id']
    );

    let spriteName = this.pokemonID + '.gif';
    if ( parseInt(this.pokemonID, 10) < 100 ) {
      if ( parseInt(this.pokemonID, 10) < 10 ) {
        spriteName = '0' + spriteName;
      }
      spriteName = '0' + spriteName;
    }
    this.spritePath = this.spritePath + 'sprite' + spriteName;
  }

  goBack(): void {
    this.location.back();
  }

}
