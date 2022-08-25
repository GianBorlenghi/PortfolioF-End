import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Person } from 'src/app/models/person';
import { PersonServiceService } from 'src/app/service/person-service.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  personForm: FormGroup;
  person: Person[] = [];
  selectedFile: File;
  croppedImage: any = '';
  imgChangeEvt: any = '';
  today = new Date();
  constructor(private form: FormBuilder, private service: PersonServiceService, private route: Router) {
    this.personForm = this.form.group({
      name: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(3),Validators.maxLength(16)]],
      surname: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(3),Validators.maxLength(30)]],
      country: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(3),Validators.maxLength(20)]],
      birth: ['', [Validators.required]],
      city: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$'),Validators.minLength(3),Validators.maxLength(25)]],
      description: ['', [Validators.required,Validators.pattern('^[a-zA-Z 0-9,.:;-]*$'),Validators.minLength(30),Validators.maxLength(500)]],
      img : ['', Validators.required]
    }
    )
  }

  ngOnInit(): void {
    this.getPersons();

  }

  submit() {
    if (this.personForm.valid) {
      this.addPerson();
    } else {
      alert('Form some have error(s)');
    }
  }

  public addPerson(): void {
    const person: Person = {
      name: this.personForm.get('name')?.value,
      surname: this.personForm.get('surname')?.value,
      dateOfBirth: this.personForm.get('birth')?.value,
      city: this.personForm.get('city')?.value,
      country: this.personForm.get('country')?.value,
      description: this.personForm.get('description')?.value
    }
    //transform base64 to File.
    var byteString = atob(this.croppedImage.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }


    const a = new Blob([ia]);
    const file = new File([a], this.selectedFile.name);


    this.service.addPerson(file,person).subscribe(
      (data: any) => {
        console.log(data);
        this.route.navigate(['/home'])
      }
    )
  }

  public getPersons(): void {
    this.service.getAllPersons().subscribe(
      resp => {
        this.person = resp
        console.log(resp)
      }

    )
  }

  public deletePerson(id: any) {

    this.service.deletePerson(id).subscribe(
      (data: any) => { console.log(data) }
    )
  }
  public fileEvent(event: any) {
    // this.selectedFile = event.target.files[0];
    const file = event.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      this.selectedFile = file;
      this.imgChangeEvt = event;
    } else {
      alert('Incopatible extension, only admits ".PNG / .JPEG"');
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

