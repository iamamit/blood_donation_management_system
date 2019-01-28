import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-acceptorpage',
  templateUrl: './acceptorpage.component.html',
  styleUrls: ['./acceptorpage.component.css']
})
export class AcceptorpageComponent implements OnInit {

  private acceptor:User;
  constructor(private userService:UserService) { }
  
  ngOnInit() 
  {
    this.getAcceptor();
  }

  getAcceptor()
  {
    this.userService.getAcceptor().subscribe(
      data=>{
        this.acceptor=data[0];
        console.log(this.acceptor);
        
    },error=>{console.log(error)});
  }
}
