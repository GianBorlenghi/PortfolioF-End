import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { AboutMeService } from 'src/app/service/about-me.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

   person:Person;
  
  constructor(private service:AboutMeService, private authService:AuthService) { }

  ngOnInit(): void {
 this.service.id = localStorage.getItem('id');
 this.getInfoById(this.service.id);
  }

  public getInfoById(id:any):void{
    this.service.personInfo().subscribe(
      data=> this.person = data
  )
  }

  public idisNull():boolean{
    if(localStorage.getItem('id') == null){
      return true;
    }else{
      return false;
    }
  }

  public isAdmin():boolean{
    return this.authService.isAdmin();
  }
}
