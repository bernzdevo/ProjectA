import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { EmployeeModule } from './employee/employee.module';


import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './routeguard/auth.guard';


const appRoutes:Routes=[
  {path:'home',component:HomeComponent},
  {path:'about',component:SampleComponent},
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  {path:'**',component:HomeComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    HomeComponent,
    AdminComponent
    
  ],
  imports: [
    BrowserModule,
    EmployeeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
