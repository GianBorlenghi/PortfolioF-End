import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from 'src/app/models/education';
import { Person } from 'src/app/models/person';
import { AboutMeService } from 'src/app/service/about-me.service';
import { EducationService } from 'src/app/service/education.service';
import { PersonServiceService } from 'src/app/service/person-service.service';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {
  editEducationForm: FormGroup;
  person: Person;
  education:Education;
  id:any =  this.activatedRoute.snapshot.params['id_education'];
  ide:any;

  constructor(private aboutme:AboutMeService,private router:Router,private personServ: PersonServiceService, private formBuilder: FormBuilder, private activatedRoute:ActivatedRoute,private educServ : EducationService) {

    this.editEducationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      area: ['', [Validators.required, Validators.minLength(4)]],
      graduation: ['', [Validators.required]],
      institution: ['', [Validators.required, Validators.minLength(4)]],
      hours:['']
    })
  
  }

  ngOnInit(): void {
    this.aboutme.id = localStorage.getItem('id');
    this.getPersons();
    this.getEducationInfo();
  }

  getPersons(){
    this.aboutme.personInfo().subscribe(
      (data:any)=>{
        this.person = data;
      }
    )
  }

  getEducationInfo(){
    this.educServ.getEducationInfo(this.id).subscribe(
      (data:any)=>{
        this.education = data;
        this.editEducationForm.controls['name'].setValue(this.education.name);
        this.editEducationForm.controls['area'].setValue(this.education.area);
        this.editEducationForm.controls['graduation'].setValue(this.education.dateOfGraduation);
        this.editEducationForm.controls['institution'].setValue(this.education.institution);
        this.editEducationForm.controls['person'].setValue(this.education.educPerson);
        this.editEducationForm.controls['hours'].setValue(this.education.hours)
      },error=>{
        alert(error.error.message);
        this.router.navigate(['/404']);
      }
    )
  }
  public submit(){
    if(this.editEducationForm.valid){
      this.editEducation();
    }else{
      alert('Form have some error.')
    }
  }

  public editEducation(){
    const educ:Education = {
      name : this.editEducationForm.get('name')?.value,
      area : this.editEducationForm.get('area')?.value,
      dateOfGraduation : this.editEducationForm.get('graduation')?.value,
      institution : this.editEducationForm.get('institution')?.value,
      educPerson : this.person,
      hours:this.editEducationForm.get('hours')?.value
    }

    this.educServ.editEducation(this.id,educ).subscribe(
      (data:any)=>
      {this.router.navigate(['/home']);
      alert(data.body);
    }
    )
  }
}
