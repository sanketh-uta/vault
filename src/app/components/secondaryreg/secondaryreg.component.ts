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
  private serverUrl = 'https://68cb-2603-8080-8f0-18a0-e4f7-8d90-2343-fcaa.ngrok-free.app';
  constructor(private http:HttpClient){}
  secondaryRegister(first_name:string,last_name:string,secondary_email:string){
    const data = {first_name:this.first_name,last_name:this.last_name,secondary_email:this.secondary_email}
    this.http.post(this.serverUrl+'/api',data).subscribe((res)=>{
      
    })
  }
}
