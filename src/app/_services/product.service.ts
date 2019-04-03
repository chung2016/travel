import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Product } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private uri = `${environment.apiUri}/products`;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>(`${this.uri}`);
  }

  getById(id: number) {
    return this.http.get(`${this.uri}/${id}`);
  }

  create(product: Product) {
    return this.http.post(`${this.uri}`, product);
  }

  update(product: Product) {
    return this.http.put(`${this.uri}/${product.id}`, product);
  }

  delete(id: Number) {
    return this.http.delete(`${this.uri}/${id}`);
  }
}
