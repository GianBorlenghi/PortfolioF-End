import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  public addImage(file:File):any{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
    )
  const formData: FormData = new FormData();
    formData.append('file', file);
   
    
 this.http.post('http://localhost:8080/workExperience/admin/addWork/imagen',formData,{headers : header}).subscribe(
  (data:any) => {localStorage.setItem('ii', data);console.log(data)}
 )
}
}
