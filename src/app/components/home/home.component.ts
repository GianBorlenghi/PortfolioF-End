import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Rol } from 'src/app/models/rol';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css'
  ]
})
export class HomeComponent implements OnInit {
 token:any = localStorage.getItem('accessToken');
  rol:Rol;
  idNull = localStorage.getItem('id');
  constructor(private authServ:AuthService,private tittle:Title) { 
    tittle.setTitle("Gian Borlenghi - Portfolio");
  }

  ngOnInit(): void {
    this.getInfo();
  }

  public getInfo():void{
    if(sessionStorage.getItem('username') !== null){
    this.authServ.getUserInfo().subscribe(
      data => {this.rol = data
        sessionStorage.setItem('rol',JSON.stringify(this.rol))
      },(err:any)=>{
        console.log(err);
      }
    )
  }
}

    }
