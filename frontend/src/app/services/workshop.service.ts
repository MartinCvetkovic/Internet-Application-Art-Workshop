import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  getAllWorkshops() {
    return this.http.get(`${this.uri}/workshops/getAllWorkshops`);
  }
}
