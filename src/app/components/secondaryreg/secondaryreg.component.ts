import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {URL} from '../../constants'
import { UserdataService } from 'src/app/shared/userdata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-secondaryreg',
  templateUrl: './secondaryreg.component.html',
  styleUrls: ['./secondaryreg.component.css']
})
export class SecondaryregComponent implements OnInit{
  name : string = '';
  primary_email : string = '';
  secondary_email : string = ''
  private serverUrl = URL;
  accesstoken: string;
  photo_url:string;
  otp:string;
  isemailvalidated = true
  isemailsame = false
  constructor(private http: HttpClient,private user:UserdataService,private router: Router){}
  ngOnInit(): void {
    this.accesstoken = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      })
    };
    this.http.get(URL+'/user',httpOptions).subscribe((res:any)=>{
        console.log(res);
        this.name = res.name
        this.secondary_email = res.secondary_email
    })
    this.accesstoken = localStorage.getItem('token')
    this.primary_email = localStorage.getItem('primary_email')
    this.name = localStorage.getItem('name')
    this.secondary_email = localStorage.getItem('secondary_email')
  }
  onFileSelected(event: any) {
    const file = event.currentTarget.files[0];
    const formobj = new FormData();
    formobj.append('file', file);
    this.accesstoken = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      })
    };
    this.http.post(URL+'/profile/upload', formobj, httpOptions).subscribe((res:any) => {
      this.photo_url = res.url
      this.user.photo_url =  res.url
      //localStorage.setItem('photo_url',res.url)
    })
  }
  resetpassword(){

  }
  sendotp(){

  }
  validateotp() {
    //after calling the API for email validation based on response enable the submit button
    this.isemailvalidated = false
  }
  secondaryRegister(name:string,primary_email:string,secondary_email:string){
    if(primary_email === secondary_email){
      this.isemailsame = true;
      return
    }
    this.user.name = name;
    this.user.primary_email = primary_email;
    this.user.secondary_email = secondary_email;
    localStorage.setItem('secondary_email',secondary_email)
    localStorage.setItem('name',name)
    localStorage.setItem('photo_url',this.photo_url)
    this.user.photo_url = this.photo_url
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      })
    };
    const data = {name:this.name,primary_email:this.primary_email,secondary_email:this.secondary_email,photo_url:this.photo_url}
    this.http.put(this.serverUrl+'/user',data,httpOptions).subscribe((res)=>{
      this.router.navigate(['/home'])
    })
  }
}
