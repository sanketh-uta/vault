import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { SecondaryregComponent } from './components/secondaryreg/secondaryreg.component';
import { FilepreviewComponent } from './components/filepreview/filepreview.component';
import { LogsComponent } from './components/logs/logs.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', component:HomeComponent},
  {path:'secreg',component:SecondaryregComponent},
  {path:'fileprev',component:FilepreviewComponent},
  {path:'logs',component:LogsComponent},
  {path:'forgot-password',component:ForgetpasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
