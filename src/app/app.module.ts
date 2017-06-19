import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { MdButtonModule, MdToolbarModule, MdTabNavBar } from '@angular/material';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import 'hammerjs';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonService } from './pokemon.service';
import { TypeService } from './type.service';
import { PokemonDisplayComponent } from './pokemon-display/pokemon-display.component';
import { MovesListComponent } from './moves-list/moves-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // MdButtonModule,
    // MdToolbarModule,
    // MdTabNavBar,
    MaterialModule,
    RouterModule.forRoot([
      {
        path: 'pokemons',
        component: PokemonListComponent
      },
      {
        path: 'moves',
        component: MovesListComponent
      },
      {
        path: 'pokemon/:id',
        component: PokemonDisplayComponent },
    ])
  ],
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDisplayComponent,
    MovesListComponent
  ],
  providers: [PokemonService, TypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
