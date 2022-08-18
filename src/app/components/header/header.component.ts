import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import Typed from 'typed.js';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   user:any;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    
    if(sessionStorage.getItem('username')!== null){
    this.user = sessionStorage.getItem('username');
    }else{
      this.user ="";
    }
    const typed = new Typed('.typed', {
     
      strings:['<i>Hello '+this.user+'</i>!','<i>Please select a person to see their information</i>',
    ],
      typeSpeed:75,
      startDelay: 300,
      backSpeed:75,
      smartBackspace:true,   
      shuffle:false,
      backDelay:1500,
      loop:true,
      loopCount:0,
      showCursor:true,
      cursorChar:'|',
      contentType: 'html',
  });} 

 public logout():void{
   this.authService.logout;
 }

 public logued():boolean{
  return this.authService.isLogued();
 }
  
 public isAdmin():boolean{
  return this.authService.isAdmin();
 }
  
 }


