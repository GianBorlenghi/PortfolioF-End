import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  private url = "http://localhost:8080/person/"
  id:any;
  constructor(private http:HttpClient) { }

  public personInfo():Observable<Person>{
    return this.http.get<Person>(this.url + 'getInfo/' + this.id);
  }

}
