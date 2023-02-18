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

  tempLogin(username, tempPass) {
    const data = {
      username: username,
      tempPass: tempPass
    }

    return this.http.post(`${this.uri}/users/tempLogin`, data);
  }

  register(
    firstname:          string,
    lastname:           string,
    username:           string,
    password:           string,
    repeatedPassword:   string,
    phone:              string,
    email:              string,
    image:              string,
    type:               string,
    orgname:            string,
    country:            string,
    city:               string,
    postal_code:        string,
    address:            string,
    adrNumber:          string,
    reg_number:         number
  ) {
    const data = {
      firstname:          firstname,
      lastname:           lastname,
      username:           username,
      password:           password,
      repeatedPassword:   repeatedPassword,
      phone:              phone,
      email:              email,
      image:              image,
      type:               type,
      orgname:            orgname,
      country:            country,
      city:               city,
      postal_code:        postal_code,
      address:            address,
      adrNumber:          adrNumber,
      reg_number:         reg_number
    }

    return this.http.post(`${this.uri}/users/register`, data);
  }

  getOrganisation(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/getOrganisation`, data);
  }

  changePassword(username, oldPassword, newPassword) {
    const data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }

    return this.http.post(`${this.uri}/users/changePassword`, data);
  }

  updateUser(oldEmail, firstname, lastname, username, phone, email, image) {
    const data = {
      oldEmail: oldEmail,
      firstname: firstname,
      lastname: lastname,
      username: username,
      phone: phone,
      email: email,
      image: image
    }

    return this.http.post(`${this.uri}/users/updateUser`, data);
  }

  getAllUsers() {
    return this.http.post(`${this.uri}/users/getAllUsers`, {});
  }

  accept(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/accept`, data);
  }

  reject(username) {
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/users/reject`, data);
  }

  changeType(username, type) {
    const data = {
      username: username,
      type: type
    }

    return this.http.post(`${this.uri}/users/changeType`, data);
  }

  sendMail(to, subject, text, html) {
    const data = {
      to: to,
      subject: subject,
      text: text,
      html: html
    }

    return this.http.post(`${this.uri}/users/sendMail`, data);
  }

  getUserByEmail(email) {
    const data = {
      email: email
    }

    return this.http.post(`${this.uri}/users/getUserByEmail`, data);
  }

  setTempPass(email, tempPass, tempDate) {
    const data = {
      email: email,
      tempPass: tempPass,
      tempDate: tempDate
    }

    return this.http.post(`${this.uri}/users/setTempPassword`, data);
  }
}
