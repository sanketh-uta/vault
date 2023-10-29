import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileoperationsService {
  constructor(private http:HttpClient){}
  folderpath = ''
  currentpath = 'https://68cb-2603-8080-8f0-18a0-e4f7-8d90-2343-fcaa.ngrok-free.app'
  fname = ''
  fpath = ''
  fileUrl = ''
  fetchfolderfiles(folder: any) {
    if(folder.type==='folder'){
      this.folderpath = this.currentpath + `/${folder.name}`
      this.currentpath = this.folderpath
      this.fetchfilesfolders(this.folderpath)
    }
  }
  fetchfilesfolders(folderPath: any) {
    // const payload = [
    //   this.fname = folderPath  
    // ]
    this.http.get(folderPath).subscribe((res)=>{

    })
  }
  setfileurl(url:string){
    this.fileUrl = url
  }
  getfileurl() {
    return this.fileUrl;
  }
}
