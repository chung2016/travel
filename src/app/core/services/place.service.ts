import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Place } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private uri = `${environment.apiUri}/places`;

  constructor(private http: HttpClient) { }

  create(place: Place) {
    return this.http.post(`${this.uri}`, place);
  }
  
}
