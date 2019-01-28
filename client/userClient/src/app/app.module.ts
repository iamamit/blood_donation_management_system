import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DonorComponent } from './components/donor/donor.component';
import { AcceptorComponent } from './components/acceptor/acceptor.component';
import { FormsModule } from '@angular/forms';

import {UserService} from './shared/user.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { DonorpageComponent } from './components/donorpage/donorpage.component';
import { AcceptorpageComponent } from './components/acceptorpage/acceptorpage.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { MydonorsComponent } from './components/mydonors/mydonors.component';

const appRoutes:Routes=[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'donor',component:DonorComponent,canActivate:[AuthGuard]},
  {path:'acceptor',component:AcceptorComponent,canActivate:[AuthGuard]},
  {path:'acceptor/mydonors',component:MydonorsComponent,canActivate:[AuthGuard]},
  {path:'acceptor/donordetails',component:DonorpageComponent,canActivate:[AuthGuard]},
  {path:'donor/acceptordetails',component:AcceptorpageComponent,canActivate:[AuthGuard]},
  {path:'acceptordetails',component:AcceptorpageComponent,canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DonorComponent,
    AcceptorComponent,
    DonorpageComponent,
    AcceptorpageComponent,
    AboutComponent,
    ContactComponent,
    MydonorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
