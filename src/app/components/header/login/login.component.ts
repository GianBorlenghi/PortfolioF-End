import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService} from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  user:User;
  resp:any;
  isLogued = false;
  subRef$: Subscription;


  constructor(private service:AuthService,private titulo:Title,private formBuilder:FormBuilder,private router:Router) { 
    titulo.setTitle("Login");

    this.form = this.formBuilder.group({
      mail:['',Validators.compose([Validators.required, Validators.email])],
      password:['',Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(14)])]
    })
  
  }

  ngOnInit(): void {
  }

  submit(mail:string){
    if(this.form.valid){
      this.logIn();
    }else{
      alert("The form have some error.");
     
    }
   }

    logIn():void{

   const login: Login ={
      mail:this.form.get('mail')?.value,
      password: this.form.get('password')?.value,
    };
    this.subRef$ =this.service.login(login).subscribe(
    (res:any)=>{
      sessionStorage.setItem('username', login.mail);
      sessionStorage.setItem('accessToken', res.accessToken);
      console.log("'" +res.tokenType +"'", res.accessToken);
      this.router.navigate(['/home']);
    },
    err=>{alert(err.error.message+ " " + err.error.code);
    
  }
  )

}
  

ngOnDestroy(){
  if(this.subRef$){
    this.subRef$.unsubscribe;
  }
}
}
