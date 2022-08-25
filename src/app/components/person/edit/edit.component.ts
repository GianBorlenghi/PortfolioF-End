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
  constructor(private form: FormBuilder, private service: PersonServiceService, private router: Router) {

    this.personForm = this.form.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3), Validators.maxLength(16)]],
      surname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3), Validators.maxLength(30)]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3), Validators.maxLength(20)]],
      birth: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(3), Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.pattern('^[a-zA-Z 0-9,.:;-]*$'), Validators.minLength(30), Validators.maxLength(500)]],
      img: [''],
      keepImg: ['']
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
        this.personForm.controls['keepImg'].setValue(true);
        this.personForm.controls['img'].clearValidators();
      }
    )
  }

  submit() {
    if (this.personForm.valid) {
      if (this.croppedImage !== '') {
        this.editPerson();
      } else {
        this.editPersonKeepImg();
      }
    } else {
      alert('Form some have error(s)');
    }
  }

  public fileEvent(event: any) {

    const file = event.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      this.selectedFile = file;
      this.imgChangeEvt = event;
    } else {
      alert('Incopatible extension, only admits ".PNG / .JPEG"');
      event.target.files[0] = null;
      console.log(file.size)
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


  editPerson() {

    //transform base64 to File.
    var byteString = atob(this.croppedImage.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const a = new Blob([ia]);
    const file = new File([a], this.selectedFile.name);

    const person: Person = {

      name: this.personForm.get('name')?.value,
      surname: this.personForm.get('surname')?.value,
      country: this.personForm.get('country')?.value,
      city: this.personForm.get('city')?.value,
      dateOfBirth: this.personForm.get('birth')?.value,
      description: this.personForm.get('description')?.value
    }

    this.service.editPerson(localStorage.getItem('id'), person, file).subscribe(

      (data: any) => {
        console.log(data);
        this.router.navigate(['/home'])
      }

    )
  }

  editPersonKeepImg() {
    const person: Person = {
      name: this.personForm.get('name')?.value,
      surname: this.personForm.get('surname')?.value,
      country: this.personForm.get('country')?.value,
      city: this.personForm.get('city')?.value,
      dateOfBirth: this.personForm.get('birth')?.value,
      description: this.personForm.get('description')?.value
    }
    console.log(person);
    this.service.editPeronKeepImg(localStorage.getItem('id'), person).subscribe(
      (data: any) => console.log('edited'),
      setTimeout(()=>this.router.navigate(['/home']),1000)   
    )
  }

  validateBirth(event: any) {
    let dateOfBirthInput = new Date(event.target.value);
    let age = this.getAge(dateOfBirthInput);

    if (dateOfBirthInput > this.today) {
      alert("ERROR! the date of birth entered is after the current date")
      event.target.value = '';

    } else if (age < 15) {
      alert('Only people over 15 years old can register on the web');
      event.target.value = '';

    }
  }
  getAge(dateOfBirth: any) {
    let years = this.today.getFullYear() - dateOfBirth.getFullYear();
    let months = this.today.getMonth() - dateOfBirth.getMonth();

    if (months < 0 || (months === 0 && this.today.getDate() < dateOfBirth.getDate())) {
      years--;
    }
    return years;
  }

  clickCheck() {
    if (this.personForm.controls['keepImg'].value === false) {
      this.personForm.controls['img'].setValidators(Validators.required);
    } else {
      this.personForm.controls['img'].clearValidators();

    }
  }
}
