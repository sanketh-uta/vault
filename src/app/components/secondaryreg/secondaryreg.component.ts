import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-secondaryreg',
  templateUrl: './secondaryreg.component.html',
  styleUrls: ['./secondaryreg.component.css']
})
export class SecondaryregComponent {
  first_name : string = '';
  last_name : string = '';
  secondary_email : string = ''
  private serverUrl = 'http://34.70.193.214:8080';
  constructor(private http:HttpClient){}
  secondaryRegister(first_name:string,last_name:string,secondary_email:string){
    const data = {first_name:this.first_name,last_name:this.last_name,secondary_email:this.secondary_email}
    this.http.post(this.serverUrl+'/api',data).subscribe((res)=>{

    })
  }
}
