import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from '../models/education';


@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private url = "http://localhost:8080/person/";
  public id:any;
  constructor(private http:HttpClient ) { }

  public getEducation(/*id:any*/):Observable<Education[]>{
    return this.http.get<Education[]>(this.url + "getEducation/" +this.id)//id);
  }

  public getEducationInfo(id:number):Observable<Education>{
    return this.http.get<Education>('http://localhost:8080/education/getEducationInfo/'+id);
  }

  public addEducation(education:Education):any{
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    )

    console.log(header);
    return this.http.post('http://localhost:8080/education/admin/add', education,{headers:header,responseType:'text'});
  }

  public deleteEducation(id:any):any{
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    )
    return this.http.delete('http://localhost:8080/education/admin/delete/' + id,{headers:header,responseType: 'text'})
  }

  public editEducation(id:number,educ:Education){
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    )

    let params = new HttpParams()
    .set('name',educ.name)
    .set('area',educ.area)
    .set('institution',educ.institution)
    .set('date_of_graduation',educ.dateOfGraduation.toString())
    .set('idPerson',educ.educPerson.idPer?.toString())
    .set('hours', educ.hours.toString())

    
    return this.http.post('http://localhost:8080/education/admin/editEducation/'+id,null,{headers:header,params:params,responseType:'text',observe:'response'});
    
    }
  }

