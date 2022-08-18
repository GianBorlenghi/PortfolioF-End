import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LogoutService } from 'src/app/service/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  //token = sessionStorage.getItem('accessToken');
  constructor(private logoutServ:LogoutService, private router:Router, private authServ:AuthService) { }

  ngOnInit(): void {  
  }

  public logout():any{

    this.logoutServ.logOut().subscribe(
      (data:any)=> {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('rol');
        alert('Bye bye, see you late.');
        location.reload();
        console.log(data);
      (error:any)=> 
          console.log(error)
    }
    );
  }

  public isLogued():boolean{
    return this.authServ.isLogued();
  }

}
