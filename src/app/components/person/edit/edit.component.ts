import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Person } from 'src/app/models/person';
import { PersonServiceService } from 'src/app/service/person-service.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  personForm: FormGroup;
  person: Person;
  selectedFile: File;
  croppedImage: any = '';
  imgChangeEvt: any = '';
  today = new Date();
  constructor(private form: FormBuilder, private service: PersonServiceService,private router:Router) {

    this.personForm = this.form.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      country: ['', Validators.required],
      birth: ['', [Validators.required]],
      city: ['', Validators.required],
      description: ['', Validators.required]
    }
    )
  }

  ngOnInit(): void {
    this.getInfo();
    }


  public getInfo(): void {
    this.service.getPersonById(localStorage.getItem('id')).subscribe(
      data => {
        this.person = data
        console.log(data);
        this.personForm.controls['name'].setValue(this.person.name);
        this.personForm.controls['surname'].setValue(this.person.surname);
        this.personForm.controls['city'].setValue(this.person.city);
        this.personForm.controls['country'].setValue(this.person.country);
        this.personForm.controls['description'].setValue(this.person.description);
        this.personForm.controls['birth'].setValue(this.person.dateOfBirth);
      }
    )
  }

  submit() {
    if (this.personForm.valid) {
      this.editPerson(); 
    } else {
      alert('Form some have error(s)');
    }
  }

  public fileEvent(event: any) {

    const file = event.target.files[0];
    if (file.type === 'image/png') {
      this.selectedFile = file;
      this.imgChangeEvt = event;
    } else {
      alert('Incopatible extension, only admits ".PNG"');
      event.target.files[0] = null;
    }

  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(this.croppedImage);

  }
  imageLoaded(event: any) {
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    alert('image failed');
  }

  
  editPerson(){

     //transform base64 to File.
     var byteString = atob(this.croppedImage.split(',')[1]);
     var ab = new ArrayBuffer(byteString.length);
     var ia = new Uint8Array(ab);
     for (var i = 0; i < byteString.length; i++) {
       ia[i] = byteString.charCodeAt(i);
     }

     const a = new Blob([ia]);
     const file = new File([a], this.selectedFile.name);

    const person:Person = {
  
      name : this.personForm.get('name')?.value,
      surname : this.personForm.get('surname')?.value,
      country : this.personForm.get('country')?.value,
      city : this.personForm.get('city')?.value,
      dateOfBirth: this.personForm.get('birth')?.value,
      description: this.personForm.get('description')?.value
    }

    this.service.editPerson(localStorage.getItem('id'),person,file).subscribe(

      (data:any)=>{console.log(data);
        this.router.navigate(['/home'])
        }
      
    )
  }

  validateBirth(event:any){
    let dateOfBirthInput = new Date(event.target.value);
    let age = this.getAge(dateOfBirthInput);

    if(dateOfBirthInput > this.today){
      alert("ERROR! the date of birth entered is after the current date")
      event.target.value = '';
      
    }else if(age < 15 ){
      alert('Only people over 15 years old can register on the web');
      event.target.value = '';

    }
}
getAge(dateOfBirth:any){
  let years = this.today.getFullYear() - dateOfBirth.getFullYear();
  let months = this.today.getMonth() - dateOfBirth.getMonth();

  if (months < 0 || (months === 0 && this.today.getDate() < dateOfBirth.getDate())) {
    years--;
}
  return years;
}

}
