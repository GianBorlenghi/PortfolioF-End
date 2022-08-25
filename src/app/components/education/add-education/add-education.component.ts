import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { Person } from 'src/app/models/person';
import { Rol } from 'src/app/models/rol';
import { User } from 'src/app/models/user';
import { AboutMeService } from 'src/app/service/about-me.service';
import { AuthService } from 'src/app/service/auth.service';
import { EducationService } from 'src/app/service/education.service';
import { PersonServiceService } from 'src/app/service/person-service.service';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.css']
})
export class AddEducationComponent implements OnInit {

  form:FormGroup;
  person:Person;
  rol:Rol;
  id:any;


  constructor(private aboutMe:AboutMeService,private formBuilder:FormBuilder,private router:Router,private serviceEduc:EducationService, private personServ:PersonServiceService,private authService:AuthService) { 

    this.form = this.formBuilder.group({
      nombre:['',[Validators.required,Validators.minLength(4),Validators.maxLength(30),Validators.pattern('^[a-zA-Z ]*$')]],
      area:['',[Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern('^[a-zA-Z ]*$')]],
      graduacion:['',[Validators.required,Validators.pattern('^[0-9/-]*$')]],
      institucion:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20),Validators.pattern('^[a-zA-Z 0-9]*$')]],
      hours:['',Validators.pattern('^[0-9]*$')]
    });
  }


  ngOnInit(): void {
    this.aboutMe.id = localStorage.getItem('id');
    this.getPersons();
  }

  public submit(){
    if(this.form.valid){
      this.addEducation();
    }else{
      alert('Form have some error.')
    }
  }

  public addEducation():void{
    const education:Education = {
      area:this.form.get('area')?.value,
      dateOfGraduation: this.form.get('graduacion')?.value,
      name:this.form.get('nombre')?.value,
      institution : this.form.get('institucion')?.value,
      educPerson : this.person,
      hours : this.form.get('hours')?.value
    }
    this.serviceEduc.addEducation(education).subscribe(
      (resp:any) => 
      {console.log(resp)  
        this.router.navigate(['/home'])
        ,
      (error:any)=>console.log(error);
        
    }
    )
  }

  public getPersons():void{
    this.aboutMe.personInfo().subscribe(
      resp=> {this.person = resp
      console.log(resp)}
      
    )
  }




}
