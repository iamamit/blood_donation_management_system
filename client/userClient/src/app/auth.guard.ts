import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from './shared/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private router:Router,private user:UserService){}

 canActivate():boolean{
   if(this.user.loggedIn())
   {
   return true;
   
   }
   else
   {
     this.router.navigate(['/login']);
     return false;
   }
 }
}
