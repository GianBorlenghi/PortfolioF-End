import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Person } from 'src/app/models/person';
import { Works } from 'src/app/models/works';
import { AboutMeService } from 'src/app/service/about-me.service';
import { PersonServiceService } from 'src/app/service/person-service.service';
import { WorkService } from 'src/app/service/work.service';


@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {

  formEditExperience: FormGroup;
  id: any = this.activatedRoute.snapshot.params['idexp'];
  work: Works;
  person:Person;
  today = new Date();
  dateValid:boolean=false;
  dateFrom:Date;
  isDateValid:boolean=false;
  constructor(private aboutMeService:AboutMeService ,private router:Router,private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private workServ: WorkService,private personServ:PersonServiceService) {
    this.formEditExperience = this.formBuilder.group({
      position: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(30),Validators.pattern('^[a-zA-Z ]*$')]],
      untilDate:[({value: '',disabled:true}),[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      fromDate:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      company:['',[Validators.required,Validators.minLength(2),Validators.maxLength(30),Validators.pattern('^[a-zA-Z 0-9]*$')]],
      description:['',[Validators.required,Validators.minLength(30),Validators.maxLength(300),Validators.pattern('^[a-zA-Z 0-9,.]*$')]]
    })

  }

  ngOnInit(): void {
    this.aboutMeService.id = localStorage.getItem('id');
    this.getPersonInfo();
    this.getWorkInfo();
  }

  saveEditWork() {
    const work: Works = {
      workName: this.formEditExperience.get('position')?.value,
      company: this.formEditExperience.get('company')?.value,
      date_from: this.formEditExperience.get('fromDate')?.value,
      date_until: this.formEditExperience.get('untilDate')?.value,
      workPerson: this.person,
      description: this.formEditExperience.get('description')?.value
    }

    this.workServ.editWork(this.id, work).subscribe(
      (data: any) => { alert(data);
      this.router.navigate(['/home'])})
    
  }

  getPersonInfo(){
    this.aboutMeService.personInfo().subscribe(
      data => this.person = data
    )
  }
  getWorkInfo() {

    this.workServ.getWorkInfo(this.id).subscribe(
      (data: any) => {
        this.work = data;
        this.isDateValid = true;
        this.dateValid = true;
        this.formEditExperience.controls['position'].setValue(this.work.workName);
        this.formEditExperience.controls['company'].setValue(this.work.company);
        this.formEditExperience.controls['fromDate'].setValue(this.work.date_from);
        this.formEditExperience.controls['untilDate'].setValue(this.work.date_until);
        this.formEditExperience.controls['person'].setValue(this.work.workPerson);
        this.formEditExperience.controls['description'].setValue(this.work.description);
    },(err:any)=>{
      this.router.navigate(['/404']);
      alert(err.error.message);    
    })
  }


  public submit(){
   if(this.formEditExperience.valid){
    this.saveEditWork();
   }else{
    
      alert("The form have some error.");
    
   }
  }

  reset(){
    this.formEditExperience.reset();
    console.log('Form reset')
  }
  
  valiDateFrom(event:any){
    const nDate = new Date(event.target.value);
    const minDate = new Date('01/01/1980')
    this.dateFrom = nDate;
    if(nDate > this.today || nDate < minDate){ 
     this.isDateValid = false;
    }else if(nDate<this.today && nDate> minDate && nDate !== null){
     this.isDateValid = true;
      this.formEditExperience.controls['untilDate'].enable();
    }
   
  }
  
  valiDateUntil(event:any){
   const nDate = new Date(event.target.value);
   console.log(this.dateFrom)
  
   if(nDate < this.dateFrom || nDate > this.today){
    this.dateValid = false;
   }else{
    this.dateValid = true;
   }
  }
  
}
