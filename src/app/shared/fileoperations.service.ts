import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {URL} from '../constants'
@Injectable({
  providedIn: 'root'
})
export class FileoperationsService {
  constructor(private http:HttpClient){
  }
  folderpath = ''
  currentpath = URL
  fname = ''
  fpath = ''
  fileUrl = ''
  versions:any[] =[]
  otp:string
  filepath:string // this will have the file path so can access in any component
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
