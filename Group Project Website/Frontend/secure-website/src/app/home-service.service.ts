import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HomeServiceService {
  private _homeUrl = "http://localhost:3000/api/home";

  constructor(private http: HttpClient) { }

  getLogged() {
    return this.http.get<any>(this._homeUrl)
  }
}
