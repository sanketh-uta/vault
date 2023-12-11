import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { URL } from 'src/app/constants';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  constructor(private http:HttpClient,private router:Router,private cdr: ChangeDetectorRef){}
  primary_email:string;
  otp:string;
  password:string;
  repassword:string
  otpvalidated:boolean = false;
  retypePassword: string; // New property for retype password
  retypePasswordTouched = false;
  isPasswordValid(): boolean {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharacterRegex = /[!@#$&^&*]/;
  
    // Check if the password meets the specified conditions
    const conditionsMet =
    (lowercaseRegex.test(this.password) ? 1 : 0) +
    (uppercaseRegex.test(this.password) ? 1 : 0) +
    (digitRegex.test(this.password) ? 1 : 0) +
    (specialCharacterRegex.test(this.password) ? 1 : 0);

  const hasRequiredConditions = conditionsMet >= 3;
  
    // Check for no more than 2 identical characters in a row
    const hasNoMoreThanTwoIdenticalCharacters = !/(.)\1\1/.test(this.password);
  
    return this.password && this.password.length >= 10 && hasRequiredConditions && hasNoMoreThanTwoIdenticalCharacters;
  }


  onRetypePasswordChange() {
    // Check if the retype password matches the original password
    if (this.retypePasswordTouched && this.password && this.retypePassword && this.password !== this.retypePassword) {
      // Handle the case where passwords do not match (show error message, etc.)
      console.error("Passwords do not match");
    }
  }

  onRetypePasswordBlur() {
    // Set the touched flag to true when the field is blurred
    this.retypePasswordTouched = true;
    // Check if the retype password matches the original password
    if (this.password && this.retypePassword && this.password !== this.retypePassword) {
      // Handle the case where passwords do not match (show error message, etc.)
      console.error("Passwords do not match");
    }
  }
  sendotp(){
    console.log("otp sent")
    //call the send Otp API
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': "application/json"
    //   }),
    // };
    const body = {
      'primary_email': this.primary_email
    }
    this.http.post(URL+'/resetpass',body).subscribe((res)=>{
      console.log("sending otp"+res)
    })
  }
  validateotp(otp:string){
    console.log("otp validated",this.primary_email+"otp",otp)
    //call the validate otp API and if success this.otpvalidated will be assigned true
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': "application/json"
    //   }),
    // };
    const body = {
      'primary_email' : this.primary_email,
      'otp' : otp
    }
    // this.http.post(URL+'/resetpass/otp',body).subscribe((res) => {
    //   console.log("validate otp",res)
    //   // this.otpvalidated = true
    // },(error)=>{
    //   console.log("error executing")
    //   this.otpvalidated = true
    // })
    this.http.post(URL+'/resetpass/otp',body,{ responseType: 'text' }).subscribe((res)=>{
      console.log("validate otp",res)
      this.otpvalidated =true
    },(error)=>{
      window.alert('Invalid Otp try resending again')
    })
  }
  resetpassword(primary_email:string,password:string){
    console.log(primary_email + "   "+password)
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': "application/json"
    //   }),
    // };
    //call the reset password API and ones success redirect to login page 
    const body = {
      'primary_email' : primary_email,
      'password' : password
    }
    this.http.post(URL+'/resetpass/update',body,{ responseType: 'text' }).subscribe((res)=>{
      const confirmation =window.confirm('Password updated successfully')
      if(confirmation){
        this.router.navigate(['/login'])
      }
      this.router.navigate(['/login'])
    },(error)=>{
      console.log(error)
    })
  }
}
