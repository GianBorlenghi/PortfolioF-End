import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Person } from 'src/app/models/person';
import { Technology } from 'src/app/models/technology';
import { AboutMeService } from 'src/app/service/about-me.service';
import { AuthService } from 'src/app/service/auth.service';
import { PersonServiceService } from 'src/app/service/person-service.service';
import { TechnologyService } from 'src/app/service/technology.service';

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.css']
})
export class AddTechnologyComponent implements OnInit {
  person:Person;
  techForm:FormGroup;

  constructor(private aboutMe:AboutMeService ,private authService:AuthService,private route:Router,private personService:PersonServiceService,private formBuilder:FormBuilder,private techService:TechnologyService) { 
    this.techForm = this.formBuilder.group({

      nameTechnology:['',[Validators.required]],
      level:['',[Validators.required]],
      //techPerson:['',[Validators.required]]
    })

    }

  ngOnInit(): void {
    this.aboutMe.id = localStorage.getItem('id');
    this.getPersons();
  }

  public submit(){
    if(this.techForm.valid){
      this.addTechnology();
    }else{
      alert('Form have some error');
    }
  }

  public getPersons():void{
   this.aboutMe.personInfo().subscribe(
      data=> this.person = data
    )
  }

  public addTechnology():void{
    const technology:Technology = {
      nameTechnology : this.techForm.get('nameTechnology')?.value,
      level : this.techForm.get('level')?.value,
      techPerson : this.person
    }
    this.techService.addTechnology(technology).subscribe(
      (data:any)=>{console.log(data)
      this.route.navigate(['home']),
      (error:any)=>console.log(error)
}
      )

  }

 


}
