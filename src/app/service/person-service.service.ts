import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {
  url = "http://localhost:8080/person"


  constructor(private http:HttpClient) { }
  
public getAllPersons():Observable<Person[]>{
  return this.http.get<Person[]>(this.url +"/getAllPerson");
}

public addPerson(file:File,person:Person):any{
  let header = new HttpHeaders().set(
    'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
  )
  const formData: FormData = new FormData();
  formData.append('file', file,file.name);
  formData.append('name',person.name)
  formData.append('surname',person.surname)
  formData.append('dateOfBirth',person.dateOfBirth.toString())
  formData.append('city',person.city)
  formData.append('country',person.country)
  formData.append('description',person.description)

  return this.http.post(this.url + "/admin/add",formData,{headers:header,responseType : 'text'})
}

public deletePerson(id:number):any{
  let header = new HttpHeaders().set(
    'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
  )

  return this.http.delete(this.url + '/admin/deletePerson/' + id,{headers:header, responseType:'text'});
}

public getPersonById(id:any):Observable<Person>{
  return this.http.get<Person>(this.url + '/getInfo/' + id);
}

public editPerson(id:any,per:Person,file:File):any{
  let header = new HttpHeaders().set(
    'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
  )
    const formData = new FormData();
    
    formData.append('idPer',id.toString());
    formData.append('file',file,file.name);
    formData.append('name',per.name);
    formData.append('surname',per.surname);
    formData.append('dateOfBirth',per.dateOfBirth.toString());
    formData.append('description', per.description);
    formData.append('city',per.city);
    formData.append('country',per.country);

  return this.http.post(this.url + '/admin/edit/'+id,formData,{headers:header})
}

public editPeronKeepImg(id:any,per:Person):any{

  let header = new HttpHeaders().set(
    'authorization','Bearer ' + sessionStorage.getItem('accessToken')
  )

  const formData = new FormData();
    
  formData.append('idPer',id.toString());
  formData.append('name',per.name);
  formData.append('surname',per.surname);
  formData.append('dateOfBirth',per.dateOfBirth.toString());
  formData.append('description', per.description);
  formData.append('city',per.city);
  formData.append('country',per.country);

  return this.http.post(this.url + '/admin/editKeepImg/'+id,formData,{headers:header});
}
}
