import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/shared/user.service';
import { getOrCreateNodeInjectorForNode } from '@angular/core/src/render3/di';

@Component({
  selector: 'app-donorpage',
  templateUrl: './donorpage.component.html',
  styleUrls: ['./donorpage.component.css']
})
export class DonorpageComponent implements OnInit {

  private donor:User;
  constructor(private userService:UserService) { }

  ngOnInit() 
  {
    this.getDonor();
  }

  getDonor()
  {
    this.userService.getDonor().subscribe(
      data=>{
        this.donor=data[0];
        console.log(this.donor);
        
    },error=>{console.log(error)});
  }



}
