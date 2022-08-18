import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Technology } from '../models/technology';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private url = "http://localhost:8080/person/"
 public id:any;
  constructor(private http:HttpClient) { }

  public getTechnology():Observable<Technology[]>{
    return this.http.get<Technology[]>(this.url +"getTech/" + this.id);
  }
  
  public addTechnology(tech:Technology):any{
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    )
    console.log(header)
    return this.http.post('http://localhost:8080/technologys/admin/add',tech,{headers:header,responseType : 'text'})
  }

  public deleteTechnology(id:any):any{
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    )
    return this.http.delete('http://localhost:8080/technologys/admin/deleteTech/'+id,{headers:header,responseType:'text'})
  }

  public getAllTech():Observable<Technology[]>{
    return this.http.get<Technology[]>('http://localhost:8080/technologys/getAllTech');
  }
}
