import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/user';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  private accUser:any;
  private user:User;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() 
  {
    this.getAcceptorList()
    this.getCurrentUser();
  }

  getAcceptorList()
  {
     this.userService.readAcceptor().subscribe(
       data=>{
         console.log(data);
         this.accUser=data;
         console.log(this.accUser);
      },
       error=>{console.log(error)}
       );
  }


  getCurrentUser()
  {
   this.userService.getCurrentLoggedUser().subscribe(data=>{
     this.user=data[0];
    console.log(this.user);
    if(this.user.role=='acceptor')
     this.router.navigate(['/home']);
    },error=>{
     console.log(error);
   })
  }


  saveAcceptor(acceptor:User)
  {
    localStorage.setItem('saveAcceptorEmail',acceptor.email);
    console.log("donor stored locally");
    this.router.navigate(['/donor/acceptordetails']);
    
  }

  approveAcceptor(donorEmail:String,acceptorEmail:String)
  {
    this.userService.approveAcceptor(donorEmail,acceptorEmail).subscribe(
      data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }
}
