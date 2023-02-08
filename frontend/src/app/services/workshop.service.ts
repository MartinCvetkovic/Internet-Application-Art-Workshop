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

  signupParticipant(_id, username) {
    let data = {
      _id: _id,
      username: username
    }
    return this.http.post(`${this.uri}/workshops/signupParticipant`, data);
  }

  cancelSignup(_id, username, status) {
    let data = {
      _id: _id,
      username: username,
      status: status
    }
    return this.http.post(`${this.uri}/workshops/cancelSignup`, data);
  }

  like(_id, username) {
    let data = {
      _id: _id,
      username: username
    }
    return this.http.post(`${this.uri}/workshops/like`, data);
  }

  unlike(_id, username) {
    let data = {
      _id: _id,
      username: username
    }
    return this.http.post(`${this.uri}/workshops/unlike`, data);
  }

  sendComment(_id, username, text, date) {
    let data = {
      _id: _id,
      username: username,
      text: text,
      date: date
    }
    return this.http.post(`${this.uri}/workshops/sendComment`, data);
  }
}
