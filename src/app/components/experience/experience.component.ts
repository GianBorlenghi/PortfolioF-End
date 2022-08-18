import { ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Works } from 'src/app/models/works';
import { AuthService } from 'src/app/service/auth.service';
import { WorkService } from 'src/app/service/work.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  works : Works[] = [];
  error:any
  erro:any = null;
  constructor(private service:WorkService,private authServ:AuthService) { }

  ngOnInit(): void {
    this.service.id = localStorage.getItem('id');
    this.getWorks(this.service.id);
  }

  public getWorks(id:any):void{
    this.service.getWork().subscribe(
      data => {this.works = data
        },(err:any)=>{
          this.erro = err.error.message;
        })
  }

  public isAdmin():boolean{
    return this.authServ.isAdmin();
  }

  public deleteWork(id:any):void{
    this.service.deleteWork(id).subscribe(
      (data:any)=>{console.log(data)}
    )
  }
}
