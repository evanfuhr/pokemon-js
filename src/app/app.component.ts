import { Component } from '@angular/core';

import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PokemonService]
})
export class AppComponent {
  title = 'app works!';
  navLinks = [
    {
      label: 'POKÉMON',
      route: '/pokemons'
    },
    {
      label: 'MOVES',
      route: '/moves'
    }
  ];
}
