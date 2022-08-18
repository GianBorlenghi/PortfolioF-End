import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Works } from '../models/works';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private url = "http://localhost:8080/";
  id:any;
  
  constructor(private http:HttpClient) { }

  public getWork():Observable<Works[]>{
    return this.http.get<Works[]>(this.url + "person/getWork/" + this.id);
  }

  public getWorkInfo(id:any):Observable<Works>{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    )
    
    return this.http.get<Works>("http://localhost:8080/workExperience/getExperience/"+id);
  }


  //addWork withouth image.
  public addWork(work:Works):any{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    )
    console.log(header);
    return this.http.post('http://localhost:8080/workExperience/admin/addWork' , work, {headers : header,responseType : 'text',observe: 'response'})
  }

  //add work with image.
  public addWorkImage(file:File,work:Works):any{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    )
    const formData: FormData = new FormData();
    formData.append('file', file,file.name);
    formData.append('workName',work.workName);
    formData.append('company',work.company);
    formData.append('description',work.description);
    formData.append('date_until',work.date_until.toString());
    formData.append('date_from',work.date_from.toString());
    formData.append('workPersonName',work.workPerson.name)
    formData.append('workPersonSurname',work.workPerson.surname)
    formData.append('workPersonDateOfBirth',work.workPerson.dateOfBirth.toString())
    formData.append('workPersonCity',work.workPerson.city)
    formData.append('workPersonCountry',work.workPerson.country)
    formData.append('workPersonDescription',work.workPerson.description)
    formData.append('workPersonId',work.workPerson.idPer?.toString());
 
     
    console.log(formData.getAll('workPerson'));

    console.log(work);
    
    console.log(formData);
    console.log(file)
  return this.http.post('http://localhost:8080/workExperience/admin/addWork/imagen',formData,{headers : header,responseType : 'text',observe: 'response'});

  }

    public editWork(id:any,work:Works){
      let header = new HttpHeaders().set(
        'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
      )

    let params = new HttpParams()
    .set('workName',work.workName)
    .set('company',work.company)
    .set('description',work.description)
    .set('date_until',work.date_until.toString())
    .set('date_from',work.date_from.toString())
    .set('workPersonId',work.workPerson.idPer?.toString())

      return this.http.post('http://localhost:8080/workExperience/admin/editExperience/'+id,null,{headers:header,params:params,responseType :'text'})
    }
  public deleteWork(id:any):any{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    )
    return this.http.delete('http://localhost:8080/workExperience/admin/delete/' + id,{headers:header,responseType:'text'})
  }
}
