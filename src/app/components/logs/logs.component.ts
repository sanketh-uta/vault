import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserdataService } from 'src/app/shared/userdata.service';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent {
  baseUrl = 'http://35.192.109.163:8082'
  accesstoken:string
  logdetails : any = []
  contextMenuVisible = false;
  contextMenuX = 0;
  contextMenuY = 0;
  isDropdownVisible: boolean = false;
  photo_url:SafeResourceUrl
  constructor(private http:HttpClient,private router:Router,private auth:AuthService,private sanitizer: DomSanitizer,private user:UserdataService){
    this.accesstoken = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      }),
    };
    this.http.get(this.baseUrl+'/logs',httpOptions).subscribe((res)=>{
      this.logdetails = res
    })
   // user.photo_url = localStorage.getItem('photo_url')
    //user.photo_url = "https://storage.googleapis.com/vault-profile-1/65f53cdc-3924-4255-8e8a-f66e0a7edc42"
    this.photo_url = this.sanitizer.bypassSecurityTrustResourceUrl(user.photo_url);
  }
//   logdetails = [
//     {
//       "id": "092ce789-487f-4af4-bb21-9c51ed6101fe",
//       "user_id": "9ba1033f-b9c5-49fb-a319-75742112231d",
//       "action": "/user",
//       "IP": "172.17.0.1:43680",
//       "client": "PostmanRuntime/7.35.0",
//       "timestamp": "2023-12-06T16:49:09.3597Z"
//   },
//   {
//       "id": "c339d43b-ca42-4a2d-ad8a-7754ef8a2322",
//       "user_id": "9ba1033f-b9c5-49fb-a319-75742112231d",
//       "action": "/user",
//       "IP": "172.17.0.1:52696",
//       "client": "PostmanRuntime/7.35.0",
//       "timestamp": "2023-12-06T17:16:05.938688Z"
//     }
//   ]
  displayedColumns: string[] = ['timestamp','action', 'IP', 'client'];
  showDropdown(event: MouseEvent) {
    console.log("thi is being called")
    const containerRect = (event.target as HTMLElement).getBoundingClientRect();
    event.preventDefault();
    this.isDropdownVisible = true;
    this.contextMenuX = containerRect.left-60;
    this.contextMenuY = containerRect.bottom;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }
  editProfile() {
    this.router.navigate(['/secreg'])
  }
  showlogs() {
    this.router.navigate(['/logs'])
  }
  terminateaccout() {
    this.accesstoken = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      }),
    };
    this.http.delete(URL+'/terminate',httpOptions).subscribe((res)=>{
      const confirmation = window.confirm('account terminated successfully')
      if(confirmation){
        this.router.navigate(['/login'])
      }
    })
  }
  logout() {
    this.auth.logout()
  }
  navtohome() {
    this.router.navigate(['/home'])
  }
}
