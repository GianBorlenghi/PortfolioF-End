import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { AuthService } from 'src/app/service/auth.service';
import { EducationService } from 'src/app/service/education.service';
import { PersonServiceService } from 'src/app/service/person-service.service';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  education:Education[] = [];
  educDelete:any;
  error:any= null;
  constructor(private route:Router,private service:EducationService,private authService:AuthService,private person:PersonServiceService) { }

  ngOnInit() {
    this.service.id = localStorage.getItem('id');
   this.getEduc(this.service.id);
   console.log(this.service.id)
  }

  public getEduc(id:any):void{
    this.service.getEducation(/*1*/).subscribe(
      data=> {this.education = data
      console.log(data)
    },(err:any)=>{
      this.error = err.error.message;
    }
    )
  }

  public getRol():boolean{
   return this.authService.isAdmin();
  }
  public getIdEduc(id:any){
    this.educDelete =  id;
  }

  public deleteEduc(){
    this.service.deleteEducation(this.educDelete).subscribe(
      (data:any)=>{
        console.log(data)
        this.route.navigate(['']);
        }
    )
  }
}

