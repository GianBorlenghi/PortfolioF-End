import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Technology } from '../models/technology';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url:string = 'http://localhost:8080/';
  id:any

  constructor(private httpClient:HttpClient) { }

  public getAllProjects():Observable<Project[]>{
  return this.httpClient.get<Project[]>(this.url +'person/getProject/'+this.id,{responseType:'json'});
}

public addProject(project:Project,file:File):any{
  let header = new HttpHeaders().set(
    'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
  )

  const formData = new FormData();
  formData.append('file',file,file.name);
  formData.append('projectName',project.project_name);
  formData.append('idPer',project.projectPerson.idPer?.toString());
  formData.append('description',project.description)
  formData.append('url',project.url)
  formData.append('urlGit',project.urlGit)

  let params = new HttpParams()
  .set('techList',JSON.stringify(project.listTechXProject));
    console.log(project.listTechXProject);
  return this.httpClient.post(this.url +'project/admin/add',formData,{headers:header,params:params,responseType:'text'});
}

public addProjectWithouthImage(project:Project):any{
  let header = new HttpHeaders().set(
    'authorization', 'Bearer '+sessionStorage.getItem('accessToken')
  )

  let params = new HttpParams()
  .set('techList',JSON.stringify(project.listTechXProject))
  .set('projectName',project.project_name)
  .set('idPer',project.projectPerson.idPer)
  .set('url', project.url)
  .set('urlGit',project.urlGit)
  .set('description',project.description)
  return this.httpClient.post(this.url +'project/admin/addWithouthImage',null,{headers:header,params:params,responseType:'text'});
}

public getProjectById(id:number):Observable<Project>{
return this.httpClient.get<Project>(this.url + 'project/getProject/'+id);
}
}
