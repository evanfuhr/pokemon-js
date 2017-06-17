import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemons';
import { Configuration } from './app.constants';

@Injectable()
export class PokemonService {
  http: any;

  private actionUrl: string;
  private headers: Headers;

  constructor(_http: Http) {
    this.http = _http;

    this.actionUrl = 'http://localhost:3000/' + 'pokemon/';

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public GetAll = (): Observable<Pokemon[]> => {
    console.log(this.actionUrl);
    return this.http.get(this.actionUrl)
      .map((response: Response) => <Pokemon[]>response.json())
      .catch(this.handleError);
  }

  getPokemons(): Promise<Pokemon[]> {
    return Promise.resolve(POKEMONS);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
