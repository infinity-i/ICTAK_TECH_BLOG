import { Injectable } from '@angular/core';
import {HttpClient,HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public http: HttpClient) { }

registerUser(registerUserData: any) {
  console.log("auth file executed");
  return this.http.post('http://localhost:3000/register',{ registerUserData }).subscribe(data =>{console.log(data)});
}

loginUser(loginUserData: any) {
  return this.http.post<any>('http://localhost:3000/login',{loginUserData});
}

adminLogin(loginUserData: any) {
  return this.http.post<any>('http://localhost:3000/admin/login',{loginUserData});
}
getToken() {
    return localStorage.getItem('token')
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  
  
}









