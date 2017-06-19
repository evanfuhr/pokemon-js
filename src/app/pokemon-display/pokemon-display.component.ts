import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  spriteName = '../../assets/sprites/';
  spritePath: string;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>
      this.pokemonID = params['id']
    );

    this.spriteName = this.spriteName + '.gif';
    if ( parseInt(this.pokemonID, 1) < 100 ) {
      if ( parseInt(this.pokemonID, 1) < 10 ) {
        this.spriteName = '0' + this.spriteName;
      }
      this.spriteName = '0' + this.spriteName;
    }
    this.spriteName = 'sprite' + this.spriteName;
  }

  goBack(): void {
    this.location.back();
  }

}
