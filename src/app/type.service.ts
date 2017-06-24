import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Type } from './type';

@Injectable()
export class TypeService {

  private actionUrl: string;
  private headers: Headers;

  constructor(private _http: Http) {

    this.actionUrl = 'http://localhost:3000/api/';

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  public GetAll = (): Observable<Type[]> => {
    return this._http.get(this.actionUrl + 'types/')
      .map((response: Response) => <Type[]>response.json())
      .catch(this.handleError);
  }

  public GetAllForPokemon = (pokemonID: string): Observable<Type[]> => {
    return this._http.get(this.actionUrl + 'pokemon/' + pokemonID + '/type')
      .map((response: Response) => <Type[]>response.json())
      .catch(this.handleError);
  }

  public GetSingle = (id: string): Observable<Type> => {
    return this._http.get(this.actionUrl + 'types/' + id)
      .map((response: Response) => <Type>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
