import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import {User} from '../user'; 
import { Router } from '@angular/router';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user:User;
  private count:number=1;
  private baseUri:string="http://localhost:3400";
  private headers=new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient,private router:Router) { }

  createUser(user:User)
  {
   return this.http.post(this.baseUri+'/create',user,{headers:this.headers});
  }

  readDonors()
  {
   return this.http.get(this.baseUri+'/donor/read',{headers:this.headers});
  }

  readAcceptor()
  {
    let email=localStorage.getItem('email');
   
    let body={
   
      email:email
    }
   return this.http.post(this.baseUri+'/acceptor/read',body,{headers:this.headers});
  }

  loginUser(email, password) 
  {
    const body = {
      email: email,
      password: password
  };

    return this.http.post(this.baseUri + '/authenticate',body,{headers:this.headers});
  }
  
  addDonor(email1, email2) 
  {
    const body = {
      acceptorEmail: email1,
      donorEmail: email2
  };

    return this.http.post(this.baseUri + '/requestdonor',body,{headers:this.headers});
  }

  setter(user:User)
  {
    this.user=user;
  }

  getter()
  {
    return this.user;
  }

  loggedIn()
  {
    return !!localStorage.getItem('token');
  }


  loggedInDonor()
  {
    return !!localStorage.getItem('token') && localStorage.getItem('role')=='donor';
  }

  loggedInAcceptor()
  {
    return !!localStorage.getItem('token') && localStorage.getItem('role')=='acceptor';
  }

  loggedOut()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('bloodgroup');
    this.router.navigate(['/login']);
  }

  getDonor()
  {
    let email=localStorage.getItem('saveDonorEmail');
    const body={email:email}
    localStorage.removeItem('saveDonorEmail');
    return this.http.post(this.baseUri + '/getdonor',body,{headers:this.headers});
  }

  getAcceptor()
  {
    let email=localStorage.getItem('saveAcceptorEmail');
    const body={email:email}
    localStorage.removeItem('saveAcceptorEmail');
    return this.http.post(this.baseUri + '/getdonor',body,{headers:this.headers});
  }

  getCurrentLoggedUser()
  {
    let email=localStorage.getItem('email');
    const body={email:email}
    return this.http.post(this.baseUri + '/getdonor',body,{headers:this.headers});
  }
 

  getDonorByBlood(bloodgroup)
  {
     let body={bloodgroup:bloodgroup}
     return this.http.post(this.baseUri + '/donor/blood/read',body,{headers:this.headers});
  }

  approveAcceptor(acceptorEmail:String,donorEmail:String)
  {
     let body={acceptorEmail:acceptorEmail,donorEmail:donorEmail}
     return this.http.post(this.baseUri + '/acceptor/approve',body,{headers:this.headers});
  }

  getMyDonors(email:string)
  {
     let body={email:email}
     return this.http.post(this.baseUri + '/acceptor/mydonors',body,{headers:this.headers});
  }
}
