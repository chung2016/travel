import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Attractions } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {
  private uri = `${environment.apiUri}/attractions`;
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Attractions[]>(`${this.uri}`);
  }

  getById(id: Number) {
    return this.http.get(`${this.uri}/${id}`);
  }

  create(attractions: Attractions) {
    return this.http.post(`${this.uri}`, attractions);
  }

  update(attractions: Attractions) {
    return this.http.put(`${this.uri}/${attractions.id}`, attractions);
  }

  delete(id: Number) {
    return this.http.delete(`${this.uri}/${id}`);
  }

}
