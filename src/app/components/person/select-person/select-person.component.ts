import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { EducationService } from 'src/app/service/education.service';
import { PersonServiceService } from 'src/app/service/person-service.service';
import { TechnologyService } from 'src/app/service/technology.service';
import { WorkService } from 'src/app/service/work.service';
import { EducationComponent } from '../../education/education.component';
import { ExperienceComponent } from '../../experience/experience.component';
import { TechnologiesComponent } from '../../technologies/technologies.component';

@Component({
  selector: 'app-select-person',
  templateUrl: './select-person.component.html',
  styleUrls: ['./select-person.component.css']
})
export class SelectPersonComponent implements OnInit {
selectForm:FormGroup;
person:Person[] = [];
  constructor(private form:FormBuilder,
    private personService:PersonServiceService,
    private educServ:EducationService,
    private route:Router) {
    this.selectForm = this.form.group({
      per: ['',Validators.required]
    }
    )

   }

  ngOnInit(): void {
    this.getPersons();
  }

  public getPersons():void{
    this.personService.getAllPersons().subscribe(
      (data:any)=>{
        this.person = data;
      }
    )
  }

  public submit(){
    if(this.selectForm.valid){
      localStorage.setItem('id',this.selectForm.get('per')?.value);
      this.route.navigate(['home']);
    }else{
      alert('Form have some error(s)');
    }
  }
}
