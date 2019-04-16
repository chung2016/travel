import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Profile } from '../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private uri = `${environment.apiUri}/profile`;
  constructor(private http: HttpClient) { }

  getById(id: Number) {
    return this.http.get(`${this.uri}/${id}`);
  }
}
