import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  registerForm:FormGroup;
  usernameAvailable: boolean = false;
  user: any = "";
  load:any = false;


  constructor(private form:FormBuilder,private authService:AuthService,private route:Router) { 

    this.registerForm = this.form.group(
      {
       mail:['',[Validators.required,Validators.email]], 
       password:['', [Validators.required,Validators.minLength(6),Validators.maxLength(14)]],
       passwordRepeat: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(14)]]
      }  
    )
  }

  ngOnInit(): void {
  }

  public submit(){
    if (this.registerForm.valid && this.usernameAvailable) {
      this.load = true;
      console.log(this.usernameAvailable)
      const button = document.getElementById('btn');
      button?.setAttribute('value', ' ')
      button!.style.backgroundColor = "#35a";
      this.addAdmin();
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
        icon?.classList.add('fa-magnifying-glass');
        icon.style.color = "#35a";
        a?.setAttribute('href', 'javascript:void(0)')
      } else if (icon?.classList.contains('fa-xmark')) {
        icon?.classList.remove('fa-xmark');
        icon?.classList.add('fa-magnifying-glass');
        icon.style.color = "#35a";
        a?.setAttribute('href', 'javascript:void(0)')
      }
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
            icon?.classList.remove('fa-magnifying-glass');
            icon?.classList.add('fa-check');
            a?.removeAttribute('href');
            icon!.style.color = "#191";
          } else {
            this.usernameAvailable = false;
            icon?.classList.remove('fa-magnifying-glass');
            icon?.classList.add('fa-xmark')
            a?.removeAttribute('href');
            icon!.style.color = "#911";
          }
        }
      )
    }
  }

  public addAdmin():void{
    const user:User = {
      mail : this.registerForm.get('mail')?.value,
      password: this.registerForm.get('password')?.value
    }

    this.authService.registerAdmin(user).subscribe(
      (data:any)=>{console.log(data)
      this.route.navigate(['/home']),
    (err:any)=>console.log(err)}
    )
  }

}
