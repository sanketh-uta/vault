import { Component, OnInit } from '@angular/core';
import { FileoperationsService } from 'src/app/shared/fileoperations.service';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URL} from '../../constants'
import { Router } from '@angular/router';
@Component({
  selector: 'app-filepreview',
  templateUrl: './filepreview.component.html',
  styleUrls: ['./filepreview.component.css']
})
export class FilepreviewComponent implements OnInit {
  data = this.fopr.versions
  //data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
 urlim :string= this.fopr.getfileurl()
 //urlim = 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf'
  safeUrl: SafeResourceUrl;
  fpathupdated : string
  filepath = this.fopr.filepath
  accesstoken : string
  sanitizedContent: SafeHtml;
  constructor(private fopr:FileoperationsService,private sanitizer: DomSanitizer,private http:HttpClient,private router:Router){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlim);
    console.log(this.data)
    // const created_at_array = [];
    // for (const version of data.versions) {
    // created_at_array.push(version.created_at);
}
  ngOnInit(){
    this.accesstoken = localStorage.getItem('token')
    this.data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }
  getnewfile(id:string){
    console.log("is clicked ", id)
    let pd = id + ""
    const body = {
      'path': this.filepath,
      'version':pd
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      }),
    };
    this.http.post(URL+'/file', body, httpOptions).subscribe((res:any)=>{
      //res.url = 'https://storage.googleapis.com/vault-profile-1/65f53cdc-3924-4255-8e8a-f66e0a7edc42'
      console.log("============",res.url)
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.url)
    })
  }
  getlatestfile(){
    const body = {
      'path':this.filepath
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      }),
    };
    this.http.post(URL+'/file', body, httpOptions).subscribe((res:any)=>{
      res.url = this.fopr.getfileurl();
      console.log("from latest",res.url)
      //res.url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.url)
    })
  }
  onFileSelected(event: any) {
    const file = event.currentTarget.files[0];
    console.log(file.name+"-------------")
    console.log("file path",this.filepath)
    let filepar = this.filepath.split("/");
    const newfname = filepar[filepar.length-1]
    this.fpathupdated = this.filepath.substring(0,this.filepath.lastIndexOf('/'))
    const formobj = new FormData();
    formobj.append('file', file,newfname);
    formobj.append('path', this.fpathupdated);
    this.accesstoken = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      })
    };
    this.http.post(URL+'/file/upload', formobj, httpOptions).subscribe((res) => {
      this.router.navigate(['/home'])
      //this.showfiles()
      console.log("file upload ", res)
    })
  }
  navttohome(){
    this.router.navigate(['/home'])
  }
}
 // url:string = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'

