import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {
user:User;
  constructor(private route:Router,private authServ:AuthService){}
 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(sessionStorage.getItem('rol')?.includes('ADMIN')){
      return true;
    }else{
      this.route.navigate(['/home']);
      return false;
    }
  }
  
}
