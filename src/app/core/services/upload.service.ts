import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private uri = `${environment.apiUri}/upload`;
  constructor(private http: HttpClient) { }

  upload(file) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.uri}`, formData);
  }
}
