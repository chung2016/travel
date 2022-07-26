import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Place } from '../models'

@Injectable()
export class PlaceService {
  private uri = `${environment.apiUri}/places`

  constructor(private http: HttpClient) {}

  create(place: Place) {
    return this.http.post(`${this.uri}`, place)
  }

  getAll() {
    return this.http.get<Place[]>(`${this.uri}`)
  }

  getByUserId(userid: number) {
    return this.http.get(`${this.uri}/user/${userid}`)
  }

  update(place: Place) {
    return this.http.put(`${this.uri}/${place.id}`, place)
  }

  getById(id: number) {
    return this.http.get<Place>(`${this.uri}/${id}`)
  }

  delete(id: number) {
    return this.http.delete(`${this.uri}/${id}`)
  }
}
