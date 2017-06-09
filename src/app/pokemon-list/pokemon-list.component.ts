import { Component, OnInit, Input } from '@angular/core';
import {Pokemon} from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  @Input() pokemons: Pokemon[];

  constructor() { }

  ngOnInit() {
  }

}
