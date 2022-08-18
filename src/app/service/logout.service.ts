import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Head } from 'rxjs';
import { LogoutComponent } from '../components/logout/logout.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  
 private url:string= "http://localhost:8080/auth";
 
  constructor(private http:HttpClient,private auth:AuthService) {

   }
 

  public logOut():any{
    
    let header = new HttpHeaders().set(
      'Authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    );
      header.set('Content-Type' , 'application/json')
    console.log(header)
    return this.http.post(this.url + "/logout",'', {headers: header,responseType : 'text'});
    }
   
  }



