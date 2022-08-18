import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Rol } from '../models/rol';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http:/localhost:8080/auth/";
  accessToken:any;
  usernameLogued:string;
  

  constructor(private http:HttpClient, private router:Router) { }

  public login(login:Login){
    return this.http.post("http://localhost:8080/auth/"+ "login",login);
  }

  public userNameAvailable(username:String):any{
    return this.http.get("http://localhost:8080/auth/userAvailableCheck/" + username);
    
  }

  public logout():void{
    localStorage.clear();
    console.log("usuario finalizado");
  }

  public getToken():any{
    return sessionStorage.getItem('accessToken');
  }

  public isLogued():boolean{
    if(this.getToken() != null){
      return true;
    }else{
      return false;
    }
  }

  public getUserInfo():Observable<Rol>{
    return this.http.get<Rol>("http://localhost:8080/auth/" + "getUserInfo/" + sessionStorage.getItem('username'));
  }

  public isAdmin():boolean{
    if(sessionStorage.getItem('rol')?.includes('ADMIN')){
      return true;
    }
    return false;
  }

  public registerUser(user:User):any{

    return this.http.post("http://localhost:8080/auth/" + 'register',user,{responseType:'text'});
  }

  public registerAdmin(user:User):any{
      let header = new HttpHeaders().set(
        'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
      )
   
      console.log(header);
    return this.http.post('http://localhost:8080/auth/admin/register',user,{headers:header,responseType:'text'})
  }

}

