import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router , } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Image } from 'src/app/models/image';
import { Person } from 'src/app/models/person';
import { Works } from 'src/app/models/works';
import { AboutMeService } from 'src/app/service/about-me.service';
import { AuthService } from 'src/app/service/auth.service';
import { ImageService } from 'src/app/service/image.service';
import { PersonServiceService } from 'src/app/service/person-service.service';
import { WorkService } from 'src/app/service/work.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.css']
})
export class AddExperienceComponent implements OnInit {

  person:Person[] = [];
  per:Person;
 workForm:FormGroup;
 work:Works;
 public image:Image;
 selectedFile:File;
 img:Image;
  formData: FormData;
  idee:number;
  croppedImage: any = '';
  imgChangeEvt : any = '';
  dateValid:boolean=false;
  dateFrom:Date;
  isDateValid:boolean=false;
  today = new Date();
  id:any;

  constructor(private imgServ:ImageService,private route:Router,private authService:AuthService,private aboutMeServ:AboutMeService,private formBuilder:FormBuilder, private workService:WorkService) { 

    this.workForm = this.formBuilder.group({
      position: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(30),Validators.pattern('^[a-zA-Z ]*$')]],
      untilDate:[({value: '',disabled:true}),[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      fromDate:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      company:['',[Validators.required,Validators.minLength(2),Validators.maxLength(30),Validators.pattern('^[a-zA-Z 0-9]*$')]],
      description:['',[Validators.required,Validators.minLength(30),Validators.maxLength(300),Validators.pattern('^[a-zA-Z 0-9,.]*$')]],
      img:['']
    });

  }

  ngOnInit(): void {
    this.aboutMeServ.id = localStorage.getItem('id');
    this.getPerson();
  }


  public getPerson(){
    this.aboutMeServ.personInfo().subscribe(
      (data:any)=>{this.per = data
      console.log(data)}
    )
  }

  public submit(){
    if(this.workForm.valid){
      if(this.croppedImage !== '' && this.workForm.get('untilDate')?.value > this.workForm.get('fromDate')?.value){
      this.addWorkImage();
    }else if(this.croppedImage == '' && this.workForm.get('untilDate')?.value > this.workForm.get('fromDate')?.value) {
      //aca va la llamada a servicio sin img.
      this.addWorkWithoutImage();
    }
    }else{
      alert("The form have some error.");
    }
  }

  //Add work w img.
  public addWorkImage():void{
    const work = {
      workName : this.workForm.get('position')?.value,
      company: this.workForm.get('company')?.value,
      date_from: this.workForm.get('fromDate')?.value,
      date_until: this.workForm.get('untilDate')?.value,
      workPerson: this.per,
      description: this.workForm.get('description')?.value,
    }
   
    //transform base64 to File.
      var byteString = atob(this.croppedImage.split(',')[1]);
      var ab  = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const a = new Blob([ia]);
    const file = new File([a],this.selectedFile.name);
    
     this.workService.addWorkImage(file,work).subscribe(
        (data:any) =>{console.log(data);
          if(data.status == 200){
            alert(data.body);
            this.route.navigate(['home'])
          }else{
            alert(data.body);
          }
        }
      )
    
}       

public addWorkWithoutImage():void{
  const work = {
    workName : this.workForm.get('position')?.value,
    company: this.workForm.get('company')?.value,
    date_from: this.workForm.get('fromDate')?.value,
    date_until: this.workForm.get('untilDate')?.value,
    workPerson: this.per,
    description: this.workForm.get('description')?.value,
  }

  console.log(work)
   this.workService.addWork(work).subscribe(
      (data:any) =>{console.log(data);
        if(data.status == 200){
          alert(data.body);
          this.route.navigate(['home'])
        }else{
          alert(data.body);
        }
        }
    )
  
}       

  public fileEvent(event:any){
   // this.selectedFile = event.target.files[0];
   const file  = event.target.files[0];
    if(file.type === 'image/png' || file.type === 'image/jpeg'){
      this.selectedFile = file;
    this.imgChangeEvt = event;
  }else{
    alert('Incopatible extension');
    event.target.files[0] = null;
  }
 
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(this.croppedImage);
  
}
imageLoaded(event:any) {
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
alert('image failed');
}

reset(){
  this.workForm.reset();
  this.croppedImage = '';
  this.imgChangeEvt = '';
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
    this.workForm.controls['untilDate'].enable();
  }
 
}

valiDateUntil(event:any){
 const nDate = new Date(event.target.value);
 
 if(nDate < this.dateFrom || nDate > this.today){
  this.dateValid = false;
 }else{
  this.dateValid = true;
 }
}


}




