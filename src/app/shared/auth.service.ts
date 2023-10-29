import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sharedvaue:any;
  constructor(private fireauth : AngularFireAuth, private router: Router,private http:HttpClient) { }
  login(email:string, password:string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then((res)=> {
      localStorage.setItem('token','true');
      console.log(res["user"]);
      this.router.navigate(['/home']);
    },err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }
  register(name:string,primary_email:string,password:string){
    // this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
    //   alert('registration successful');
    //   this.router.navigate(['/login'])
    // },err=>{
    //   alert(err.message);
    //   this.router.navigate(['/register'])
    // })
    const data = {name,primary_email,password}
    this.http.post('https://68cb-2603-8080-8f0-18a0-e4f7-8d90-2343-fcaa.ngrok-free.app/register',data).subscribe((res:any)=>{
      const token = res.token
      this.loginWithCustomToken(token)
      this.router.navigate(['/home']);
      console.log("response for login",data)
      console.log("registration",res);
    })
  }
  logout(){
    this.fireauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login'])
    },err=> {
      alert(err.message)
    })
  }
  loginWithCustomToken(token: string){
    console.log("asdfg",token)
    this.fireauth.signInWithCustomToken(token).then((userdetails)=>{
      console.log("user details",userdetails)
      const user = userdetails.user;
      console.log("use is ",user.getIdToken())
      // const idToken = user && (await user.getIdToken());
      // console.log("is token is ",idToken)

      user.getIdToken()
      .then(idToken => {
        console.log("The token is", idToken);
        this.sharedvaue = idToken
        localStorage.setItem('token', idToken);
        // console.log("IDTOKEN GENERATED   " + idToken);
      })
      .catch(error => {
        console.error("Error occurred while getting ID token:", error);
        // Handle error
      });
      // localStorage.setItem('token',userdetails.idToken);
      // console.log("IDTOKEN GENERATED   "+userdetails.idToken);
    })
  }
}
