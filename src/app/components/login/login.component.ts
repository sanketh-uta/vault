import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  private serverUrl = 'https://68cb-2603-8080-8f0-18a0-e4f7-8d90-2343-fcaa.ngrok-free.app';
  primary_email: String = ''
  password: String = ''
  constructor(private auth: AuthService, private http: HttpClient,private outh:AngularFireAuth,private router: Router) { }
  // login() {

  //   if(this.email == '') {
  //     alert('Please enter email');
  //     return;
  //   }

  //   if(this.password == '') {
  //     alert('Please enter password');
  //     return;
  //   }

  //   this.auth.login(this.email,this.password);
  //   this.email = '';
  //   this.password = '';

  // }
  login(primary_email: String, password: String) {
    console.log(primary_email + " " + password);
    const loginData = { primary_email, password }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    // this.http.post<any>(`${this.serverUrl}/login`, loginData, httpOptions).subscribe(
    //   (response) => {
    //     //const token = response.token; //from here I am geting the custom token from the back end server so I am calling the loginwithcustomtoken
    //     // Use the token to authenticate with Firebase (e.g., signInWithCustomToken)
    //     // Handle Firebase authentication and store the token for future requests
    //     const token  = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay04cjVnNkB2YWx1dC1zdmMuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImV4cCI6MTY5ODM0NDA1MiwiaWF0IjoxNjk4MzQwNDUyLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay04cjVnNkB2YWx1dC1zdmMuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiI1ZWU0ZWU1My00OTdjLTRlMjAtYTg3OS1lNWE5ZmE0ZDhhMjkifQ.QlXDndRinN4NkdIsurDf0PFFwUYRO9B2Qur6kJpAFJvLj5zXxJ20xgvoIVFGcN57_g9Uu6wpxyQXx1kHsFO7KTDc5bl5tMEVm96wL6IMsQlrImX5PxKIrYeZpTllzF8s0615SOB4u-SQHMc_fXLI3FCy81YZ-VNX5wi-ZLo6dHbG2abiLyV1PyMvqHo7c3L5Ae34BqPbTu47KLKC-XqEViMY9GL9gES_akrCpmGGFijuMD_k8hRKhQ5Wci6V8iMsMEKGOcwxvZOPVFz5qmo9Wro2uiZw0SMSbp5f9wJwk1xMUU6-YJmwUEUCFYqjOiGGTbjQvvoMRPE4o8ROornDBQ'
    //     this.loginWithCustomToken(token)
    //   },
    //   (error) => {
    //     console.error('Login failed:', error);
    //   }
    // );

    // const token ='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay04cjVnNkB2YWx1dC1zdmMuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImV4cCI6MTY5ODM0Nzk1NywiaWF0IjoxNjk4MzQ0MzU3LCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay04cjVnNkB2YWx1dC1zdmMuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiIxYzY2ZGZmZi1hMWJhLTRiNzQtOGNmYS1iYzdjYzYxNTg4OWIifQ.dq0Gs_niq_I71jI2O3phO8EKW8ft-G3icYw-PeAy9cUuvGjwxseioKyddp-MGHmaeeqve0vCfEl7460991LMWZ1EcvknskCXqWkaJuKkQ18delwSUIqPmurcOQJTAbV5TL01B4KIUGRKmKZxxCt7WNLqyNxYgo1LqJp7NBVOcVyWZ9aw3c6c0f1xGWLjYnkmZJxhwf8NYp3n6cDEqsCdCKSIyy2NnxtiaBSWvwILSMgGSKSNP9c3-P-nGi92PLy72skxPFHbe8o2t1rPPwYxnuDoCsP9oqUAkVp7srECQ7zFBfop4hnFdoaNtlarX1egvpNP_MQjgQfQZ89QhDWtaQ'
    //this.loginWithCustomToken(token)
    this.http.post(this.serverUrl+'/login',loginData).subscribe((data:any)=>{
    //const resp = JSON.stringify();
    //console.log(resp)
    //   console.log(typeof(res))
    //console.log(res.keys)
      const token = data.token
      this.auth.loginWithCustomToken(token)
      this.router.navigate(['/home']);
      console.log("response for login",data)
    })
  }
  
  // loginWithCustomToken(token: string){
  //   this.outh.signInWithCustomToken(token).then((userdetails)=>{
  //     const user = userdetails.user;
  //     const idtoken = user && user.getIdToken();
  //     localStorage.setItem('token','');
  //     console.log("IDTOKEN GENERATED   "+idtoken.toString());
  //   })
  // }
}

// signInWithGoogle() {
//   this.auth.googleSignIn();
// }
