import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/service/auth.service';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  project:Project[] = [];
  techxProj:any[] = [];
  ids:any[];
  photo:any;
  idEdit:number;
  error:any = null;
  constructor(private service:ProjectService,private authServ:AuthService) { }

  ngOnInit(): void {
    this.service.id = localStorage.getItem('id');
    this.getProjects();
  }

  public getProjects(){
    this.service.getAllProjects().subscribe(
      (data:any)=>{ this.project = data
      console.log(data.listTechXProject)},
      (err:any)=>{
        this.error = err.error.message;
      }
    )
  }
  public isAdmin():boolean{
    return this.authServ.isAdmin();
  }

  public viewPhoto(i:any):any{
    this.photo = i;
  }

  public getId():any{
    return this.photo;
  }

  public idEditProject(id:any){
    this.service.getProjectById(id).subscribe(
      data=>console.log(data)
    )
  }

}
