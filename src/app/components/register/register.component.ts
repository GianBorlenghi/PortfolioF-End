import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  load: boolean = false;
  user: any = "";
  usernameAvailable: boolean;
  controlAvailable:number = 0;
  constructor(private route: Router, private form: FormBuilder, private authService: AuthService) {

    this.registerForm = this.form.group(
      {
        mail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]],
        passwordRepeat: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]]
      }
    )
  }

  ngOnInit(): void {
  }

  public getRol(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    } else {
      return false;
    }
  }

  public submit() {
    if (this.registerForm.valid && this.usernameAvailable) {
      this.load = true;
      console.log(this.usernameAvailable)
      const button = document.getElementById('btn');
      button?.setAttribute('value', ' ')
      button!.style.backgroundColor = "#35a";
      this.addUser();
    } else if (!this.registerForm.valid) {
      alert('Form have some error(s)');
    } else if (!this.usernameAvailable == false) {
      alert('Please check username availability');
    }
  }

  getUser(event: any) {
    this.usernameAvailable = false;
    if (!this.registerForm.controls['mail'].errors) {
      this.user = event.target.value;
      const icon = document.getElementById('icon');
      const a = document.getElementById('link');

      if (icon?.classList.contains('fa-check')) {
        icon?.classList.remove('fa-check');
       // icon?.classList.add('fa-magnifying-glass');
        icon.style.color = "#35a";
        a?.setAttribute('href', 'javascript:void(0)')
      } else if (icon?.classList.contains('fa-xmark')) {
        icon?.classList.remove('fa-xmark');
        //icon?.classList.add('fa-magnifying-glass');
        icon.style.color = "#35a";
        a?.setAttribute('href', 'javascript:void(0)')
      }
    }
    const time = setTimeout(()=>{
      this.userAvailable()
    },300);
  }

  getAvailable(){
    return this.controlAvailable;
  }

  setFalseAvailable(){
    this.usernameAvailable = false;
    this.controlAvailable = 0;
    const icon = document.getElementById('icon');
    const a = document.getElementById('link');
    if (icon?.classList.contains('fa-check')) {
      icon?.classList.remove('fa-check');
     // icon?.classList.add('fa-magnifying-glass');
      icon.style.color = "#35a";
      a?.setAttribute('href', 'javascript:void(0)')
    } else if (icon?.classList.contains('fa-xmark')) {
      icon?.classList.remove('fa-xmark');
     // icon?.classList.add('fa-magnifying-glass');
      icon.style.color = "#35a";
      a?.setAttribute('href', 'javascript:void(0)')
    }
  }
  userAvailable() {
    const icon = document.getElementById('icon');
    const a = document.getElementById('link');
    if (this.user !== "") {
      this.authService.userNameAvailable(this.user).subscribe(
        (data: any) => {
          if (data == true) {
            this.usernameAvailable = true;
           // icon?.classList.remove('fa-magnifying-glass');
            icon?.classList.add('fa-check');
            a?.removeAttribute('href');
            icon!.style.color = "#191";
            this.controlAvailable = 1;
          } else {
            this.usernameAvailable = false;
         //   icon?.classList.remove('fa-magnifying-glass');
            icon?.classList.add('fa-xmark')
            a?.removeAttribute('href');
            icon!.style.color = "#911";
            this.controlAvailable = 2;
          }
        }
      )
    }
  }
  public addUser(): void {
    const user: User = {
      mail: this.registerForm.get('mail')?.value,
      password: this.registerForm.get('password')?.value
    }
    this.authService.registerUser(user).subscribe(
      (data: any) => {
        console.log(data)
        this.route.navigate(['/login'])
      }
    )

  }



}
