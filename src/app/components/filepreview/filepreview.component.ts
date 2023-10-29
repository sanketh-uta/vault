import { Component } from '@angular/core';
import { FileoperationsService } from 'src/app/shared/fileoperations.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-filepreview',
  templateUrl: './filepreview.component.html',
  styleUrls: ['./filepreview.component.css']
})
export class FilepreviewComponent {
  urlim :string= this.fopr.getfileurl()
  safeUrl: SafeResourceUrl;
  constructor(private fopr:FileoperationsService,private sanitizer: DomSanitizer){
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlim);
  }
 // url:string = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'


}
