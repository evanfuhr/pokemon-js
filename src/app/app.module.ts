import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdToolbarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import 'hammerjs';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import {PokemonService} from './pokemon.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdToolbarModule,
    RouterModule.forRoot([
      {
        path: 'pokemons',
        component: PokemonListComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    PokemonListComponent
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
