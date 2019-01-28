 import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email = '';
  password = '';
  user:any;
  role:any;

  constructor(private service:UserService,private router:Router) { }


  findRole(email:any)
{
  return email;
}

  onLogin() {
    
    return this.service.loginUser(this.email, this.password).subscribe(result=>
      {
      // this.user = result;
      // this.role=this.user[0].role;
      //   console.log(this.role);
      //   if(this.role=='donor')
      //   this.router.navigate(['/donor']);
      //   else
       
       
       
      console.log(result['token']);
      console.log(result['role']);
       localStorage.setItem('token',result['token'])
       localStorage.setItem('email',this.email)
       localStorage.setItem('role',result['role']);
       if(localStorage.getItem('role')=='donor')
        this.router.navigate(['/donor']);
        else
        this.router.navigate(['/acceptor']);
    },
    error=>{
      console.log(error);

      this.router.navigate(['/login']);
    })

       
}

  ngOnInit() {
  }

 
  
  
}
