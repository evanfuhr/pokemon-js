import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
  public Server = 'http://localhost:3000/';
  public ApiUrl = '';
  public ServerWithApiUrl = this.Server + this.ApiUrl;
}
