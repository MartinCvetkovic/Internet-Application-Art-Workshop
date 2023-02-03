import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  register(username, password) {
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/users/register`, data);
  }

  getOrganisation(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/getOrganisation`, data);
  }
}
