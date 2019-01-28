import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import {UserService} from '../../shared/user.service';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-mydonors',
  templateUrl: './mydonors.component.html',
  styleUrls: ['./mydonors.component.css']
})
export class MydonorsComponent implements OnInit {

  private donors:any;
  private user:User;
  private count:number=0;
  private countArray:number[];
  private length:number;
  private bloodgroup:string=undefined;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() 
  {
    this.getMyDonors();
    this.getCurrentUser();
  }


  getAllDonors()
  {
    
    console.log("Hello");
    
      this.userService.readDonors().subscribe(
        result=>{
          console.log(result);
          
          
         
          this.donors=result['msg'];
          result=this.donors.length;
          
          console.log(this.donors);
        },
        error=>{console.log(error)}
      )


  }
 
  requestDonor(requestedDonor:User)
  {
      console.log(requestedDonor.name);
      console.log(requestedDonor.role);
      const email1=localStorage.getItem('email');
      this.userService.addDonor(email1,requestedDonor.email).subscribe(
       data=>{
         console.log(data);
       },
       error=>{
        console.log(error);
       }
      );
  }

  requestedAcceptor(acc:User)
  {
    console.log("hello Donor");
    console.log(acc.name);
    console.log(acc.role);
    const email1=localStorage.getItem('email');
    this.userService.addDonor(acc.email,email1).subscribe(
     data=>{
       console.log(data);
     },
     error=>{
      console.log(error);
     }
    );
  }

  saveDonor(donor:User)
  {
    localStorage.setItem('saveDonorEmail',donor.email);
    console.log("donor stored locally");
    
  }

  getCurrentUser()
  {
   this.userService.getCurrentLoggedUser().subscribe(data=>{
     this.user=data[0];
    console.log(this.user);
    if(this.user.role=='donor')
     this.router.navigate(['/home']);
    },error=>{
     console.log(error);
   })
  }

  getMyDonors()
  {
    console.log(this.bloodgroup);

    console.log("Hello");
    
    this.userService.getMyDonors(localStorage.getItem('email')).subscribe(
      result=>{
        this.donors=result;
        console.log(this.donors);
        
        
       
        //this.donors=result[];
        //result=this.donors.length;
        
       
      },
      error=>{console.log(error)}
    )
   
  }
  
  saveBloodGroup()
  {
    localStorage.setItem('bloodgroup',this.bloodgroup);
    location.reload();
   // localStorage.removeItem('bloodgroup');
    
    
  }
}
