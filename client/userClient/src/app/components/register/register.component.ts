import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { UserService } from '../../shared/user.service';
import { User } from '../../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user:User;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() 
  {
    this.user=this.userService.getter();
  }
  registerOrUpdate()
  {
    this.userService.createUser(this.user).subscribe(
      data=>{
        console.log(data);
        
        this.router.navigate(['/']);
      },
      error=>{
        console.log(error);
      }
    );
  }

}
