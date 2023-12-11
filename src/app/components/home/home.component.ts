import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, HostListener, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FileoperationsService } from 'src/app/shared/fileoperations.service'
import { Router } from '@angular/router';
import { URL } from '../../constants'
import { UserdataService } from 'src/app/shared/userdata.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatSort } from '@angular/material/sort';
export interface Section {
  name: string;
  updated: Date;
  type: 'folder' | 'file'
}
export interface DialogData {
  newfolder: string
}
export interface DialogResp {
  newname: string
}
export interface DialogOTP {
  otp: string
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild(MatSort) sort = {} as MatSort;
  selectedFile: any;
  email: string = ''
  password: string = ''
  newname: any;
  contextMenuVisible = false;
  contextMenuX = 0;
  contextMenuY = 0;
  rightClickedFolder: any;
  filePath: string[] = ['Root'];
  folderPath: string = '';
  currentPath: string = URL
  newfolder: string = ''
  fname: string = ''
  fpath: string = ''
  folders: any = []
  accesstoken = ''
  prepath = ''
  postpath = ''
  bodyparam = ''
  isRoot: boolean = false
  otp: string = ''
  isDropdownVisible: boolean = false;
  photo_url: SafeResourceUrl;
  constructor(private auth: AuthService, private foper: FileoperationsService, private http: HttpClient, private el: ElementRef, public dialog: MatDialog, private router: Router, private user: UserdataService, private sanitizer: DomSanitizer) {
    // const accestoken = localStorage.getItem('token')
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': accestoken
    //   })
    // };
    // this.http.get('https://68cb-2603-8080-8f0-18a0-e4f7-8d90-2343-fcaa.ngrok-free.app/file', httpOptions).subscribe((res) => {
    //   this.folders = res
    // })
    setTimeout(() => {
      this.accesstoken = localStorage.getItem('token')
      console.log("executing while relogin", this.accesstoken)
      const httpOptions = {
        headers: new HttpHeaders({
          'X-Firebase-AppCheck': this.accesstoken,
          // 'Content-Type': 'multipart/form-data'
        }),
      };
      this.http.get(URL + '/user', httpOptions).subscribe((res: any) => {
        console.log("executing while relogin")
        console.log(res.photo_url)
        // localStorage.setItem('photo_url',JSON.stringify(res.photo_url))
        // localStorage.setItem('name',res.name)
        // localStorage.setItem('primary_email',res.primary_email)
        // localStorage.setItem('secondary_email',res.secondary_email)
        this.user.name = res.name;
        this.user.photo_url = res.photo_url;
        this.user.primary_email = res.primary_email;
        this.user.secondary_email = res.secondary_email
      })
      console.log("constr", this.accesstoken)
      //user.photo_url = "https://storage.googleapis.com/vault-profile-1/65f53cdc-3924-4255-8e8a-f66e0a7edc42"
      this.photo_url = this.sanitizer.bypassSecurityTrustResourceUrl(user.photo_url);
      console.log("user details from user data service are ", localStorage.getItem('name') + " ", localStorage.getItem('primary_email') + " ", localStorage.getItem('secondary_email') + " ", localStorage.getItem('photo_url'))
    }, 1000)
    //   this.accesstoken = localStorage.getItem('token')
    //   console.log("executing while relogin",this.accesstoken)
    //   const httpOptions = {
    //     headers: new HttpHeaders({
    //       'X-Firebase-AppCheck': this.accesstoken,
    //       // 'Content-Type': 'multipart/form-data'
    //     }),
    //   };
    //   this.http.get(URL+'/user',httpOptions).subscribe((res:any)=>{
    //     console.log("executing while relogin")
    //     console.log(res.photo_url)
    //     // localStorage.setItem('photo_url',JSON.stringify(res.photo_url))
    //     // localStorage.setItem('name',res.name)
    //     // localStorage.setItem('primary_email',res.primary_email)
    //     // localStorage.setItem('secondary_email',res.secondary_email)
    //     user.name = res.name;
    //     user.photo_url = res.photo_url;
    //     user.primary_email = res.primary_email;
    //     user.secondary_email = res.secondary_email
    //   })
    //   console.log("constr", this.accesstoken)
    //  //user.photo_url = "https://storage.googleapis.com/vault-profile-1/65f53cdc-3924-4255-8e8a-f66e0a7edc42"
    //   this.photo_url = this.sanitizer.bypassSecurityTrustResourceUrl(user.photo_url);
    //   console.log("user details from user data service are ",localStorage.getItem('name') + " ", localStorage.getItem('primary_email') + " ",localStorage.getItem('secondary_email') + " ",localStorage.getItem('photo_url'))
  }
  // folders: Section[] = [
  //   {
  //     name: 'Photos',
  //     updated: new Date('1/1/16'),
  //     type: 'folder'
  //   },
  //   {
  //     name: 'Recipes',
  //     updated: new Date('1/17/16'),
  //     type: 'folder'
  //   },
  //   {
  //     name: 'Work',
  //     updated: new Date('1/28/16'),
  //     type: 'file'
  //   },
  // ];
  // folderspe: Section[] = [
  //   {
  //     name: 'Photos',
  //     updated: new Date('1/1/16'),
  //     type: 'folder'
  //   },
  //   {
  //     name: 'Recipes',
  //     updated: new Date('1/17/16'),
  //     type: 'folder'
  //   },
  //   {
  //     name: 'Work',
  //     updated: new Date('1/28/16'),
  //     type: 'file'
  //   },
  //   {
  //     name: 'Work',
  //     updated: new Date('1/28/16'),
  //     type: 'file'
  //   },
  // ]; just to check if I am gettting the correct values in the UI
  displayedColumns: string[] = ['name', 'modified_time', 'size', 'type'];
  dataSource = this.folders;
  folderClicked(folder: any) {
    this.foper.fetchfolderfiles(folder);
  }
  fileClicked(file: any) {
    console.log(file)
  }
  showDropdown(event: MouseEvent) {
    console.log("thi is being called")
    const containerRect = (event.target as HTMLElement).getBoundingClientRect();
    event.preventDefault();
    this.isDropdownVisible = true;
    this.contextMenuX = containerRect.left - 60;
    this.contextMenuY = containerRect.bottom;
  }

  hideDropdown() {
    this.isDropdownVisible = false;
  }
  logout() {
    this.auth.logout()
    this.email = ''
    this.password = ''
  }
  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    if (this.contextMenuVisible) {
      const menu = this.el.nativeElement.querySelector('.context-menu');
      if (!menu.contains(event.target as Node)) {
        this.closeContextMenu();
      }
    }
  }
  closeContextMenu() {
    this.contextMenuVisible = false;
  }
  showContextMenu(event: MouseEvent, folder: any) {
    event.preventDefault(); // Prevent the default context menu from appearing
    this.rightClickedFolder = folder;
    this.contextMenuX = event.clientX;
    this.contextMenuY = event.clientY;
    this.contextMenuVisible = true;
  }
  editProfile() {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'X-Firebase-AppCheck': this.accesstoken,
    //     // 'Content-Type': 'multipart/form-data'
    //   }),
    // };
    // this.http.get(URL+'/userdetails',httpOptions).subscribe((res:any)=>{
    //   localStorage.setItem('name',res.name)
    //   localStorage.setItem('primary_email',res.primary_email)
    //   localStorage.setItem('secondary_email',res.secondary_email)
    // })
    this.router.navigate(['/secreg'])
  }
  openFolder() {
    // Implement logic to open the right-clicked folder
    // You can use this.rightClickedFolder to access the folder data
    //this.dataSource = this.folderspe   //just to check if I am gettting the correct values in the UI
    //this.folderClicked(this.rightClickedFolder)
    if (this.postpath === '')
      this.bodyparam = this.rightClickedFolder.name
    else
      this.bodyparam = this.postpath + '/' + this.rightClickedFolder.name
    this.accesstoken = localStorage.getItem('token')
    this.foper.filepath = this.bodyparam
    const body = {
      'path': this.bodyparam
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      }),
    };
    if (this.rightClickedFolder.type === 'file') {
      // this.http.post(URL+'/file', body, httpOptions).subscribe((res: any) => {
      //   this.foper.versions = res.versions
      //   this.foper.setfileurl(res.url)
      //   this.router.navigate(['/fileprev']);
      // })
      this.securefileopen() //commented to test --> is required for OTP popup

    }
    console.log(this.rightClickedFolder) //I am getting the folder name so can pass to the API 
    if (this.rightClickedFolder.type === 'folder' && this.rightClickedFolder.name !== '') {
      this.postpath = this.postpath + '/' + this.rightClickedFolder.name
      this.postpath = this.postpath.substring(1, this.postpath.length)
    }
    else if (this.rightClickedFolder == '')
      this.postpath = this.postpath + this.rightClickedFolder.name
    this.showfolderfiles(this.postpath)
    this.contextMenuVisible = false
  }
  securefileopen() {
    if (this.postpath === '')
      this.bodyparam = this.rightClickedFolder.name
    else
      this.bodyparam = this.postpath + '/' + this.rightClickedFolder.name
    this.accesstoken = localStorage.getItem('token')
    const body = {
      'path': this.bodyparam,
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      }),
    };
    this.http.post(URL + '/file/otp', body, httpOptions).subscribe((res: any) => {
      const dialogRef = this.dialog.open(OTPPopup, {
        data: { otp: this.otp },

      });

      dialogRef.afterClosed().subscribe((data) => {
        const fiotp = {
          'path': this.bodyparam,
          'otp': this.foper.otp
        }
        if (data.buttonClicked == 'resend') {
          this.securefileopen()
          // this.createFolder(data)
          // this.createFolder(data)
          // You can now use the 'data' value in your AppComponent.
          // Perform any actions you need with the data.
        }
        else if (data.buttonClicked == 'submit') {
          console.log("printing the otp ", data.otpentered)
          this.http.post(URL + '/file', fiotp, httpOptions).subscribe((res: any) => {
            this.foper.versions = res.versions
            this.foper.setfileurl(res.url)
            this.router.navigate(['/fileprev']);
          }, (error) => {
            //alert('Invalid OTP please try again');
            const confirmation = window.confirm('Invalid OTP please try again')
            if (confirmation) {
              this.securefileopen()
            }
          })
          //here call the OTP POST API
        }
      });
    }, (error) => {
      const dialogRef = this.dialog.open(OTPfailPopup)
      // const dialogRef = this.dialog.open(OTPPopup, {
      //   data: { otp: this.otp },

      // });
      // dialogRef.afterClosed().subscribe((data: string) => {
      //   if (data) {
      //     console.log('Data received from dialog:', data);
      //     // this.createFolder(data)
      //     // this.createFolder(data)
      //     // You can now use the 'data' value in your AppComponent.
      //     // Perform any actions you need with the data.
      //   }
      // });
    });
  }
  showfolderfiles(rightClickedFolder: any) {
    this.accesstoken = localStorage.getItem('token')
    var raw = JSON.stringify({
      "path": rightClickedFolder
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        'Content-Type': 'application/json'
      })
    };
    this.http.post(URL + '/list', raw, httpOptions).subscribe((res) => {
      console.log("file list", res)
      this.folders = res
      this.dataSource = this.folders;
      this.isRoot = true
    })
  }
  goback() {
    this.postpath = this.postpath.substring(0, this.postpath.lastIndexOf('/'));
    //this.http.post('https://68cb-2603-8080-8f0-18a0-e4f7-8d90-2343-fcaa.ngrok-free.app/list',)
    this.showfolderfiles(this.postpath)
  }
  renameFolder() {
    // Implement logic to rename the right-clicked folder
    // You can use this.rightClickedFolder to access the folder data
    const dialogRef = this.dialog.open(RenamePopup, {
      data: { newname: this.newname },

    });
    dialogRef.afterClosed().subscribe((data: string) => {
      if (data) {
        console.log('Data received from dialog:', data);
        this.createFolder(data)
        // You can now use the 'data' value in your AppComponent.
        // Perform any actions you need with the data.
      }
    });
  }
  terminate() {
    this.accesstoken = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      }),
    };
    this.http.delete(URL + '/terminate', httpOptions).subscribe((res) => {
      const confirmation = window.confirm('account terminated successfully')
      if (confirmation) {
        this.router.navigate(['/login'])
      }
    })
  }
  showlogs() {
    this.router.navigate(['/logs'])
  }
  deleteFolder() {
    // Implement logic to delete the right-clicked folder
    // You can use this.rightClickedFolder to access the folder data
    if (this.postpath === '')
      this.bodyparam = this.rightClickedFolder.name
    else
      this.bodyparam = this.postpath + '/' + this.rightClickedFolder.name
    console.log(this.rightClickedFolder)
    const payload = {
      // fname: this.rightClickedFolder.name,
      path: this.bodyparam,
      type: this.rightClickedFolder.type
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      }),
      body: payload
    };

    return this.http.delete(URL + '/file', httpOptions).subscribe((res) => {
      this.contextMenuVisible = false
      this.showfiles()
    });


  }
  navigateTo(folder: string) {
    // Implement navigation logic to load the content of the selected folder
    // Update this.filePath accordingly
    this.folderClicked(folder)
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogPopup, {
      data: { newfolder: this.newfolder },

    });
    dialogRef.afterClosed().subscribe((data: string) => {
      if (data) {
        console.log('Data received from dialog:', data);
        this.createFolder(data)
        this.createFolder(data)
        // You can now use the 'data' value in your AppComponent.
        // Perform any actions you need with the data.
      }
    });
  }
  resendotp() {
    console.log("resend otp")
  }
  createFolder(data: string) {
    // this.http.post('/file-upload-API', this.currentPath).subscribe((res) => {
    //   //this.folders = res folders will have the updated list of folder after creating
    // })
    if (this.postpath === '')
      this.bodyparam = data
    else
      this.bodyparam = this.postpath + '/' + data
    this.accesstoken = localStorage.getItem('token')
    const body = {
      'path': this.bodyparam
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      }),
    };

    this.http.post(URL + '/folder', body, httpOptions).subscribe((res) => {
      this.showfiles()
    })
  }
  // uploadFile() {
  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile);
  //   const payload = [
  //     formData,
  //     this.currentPath
  //   ]
  //   this.http.post('upload-api', payload).subscribe((res) => {

  //   })
  // }
  onFileSelected(event: any) {
    const file = event.currentTarget.files[0];
    const formobj = new FormData();
    formobj.append('file', file);
    formobj.append('path', this.postpath);
    this.accesstoken = localStorage.getItem('token')
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        // 'Content-Type': 'multipart/form-data'
      })
    };
    this.http.post(URL + '/file/upload', formobj, httpOptions).subscribe((res) => {
      this.showfiles()
      console.log("file upload ", res)
    })
  }
  showfiles() {
    this.accesstoken = localStorage.getItem('token')
    var raw = JSON.stringify({
      "path": this.postpath
    })
    const httpOptions = {
      headers: new HttpHeaders({
        'X-Firebase-AppCheck': this.accesstoken,
        'Content-Type': 'application/json'
      })
    };
    this.http.post(URL + '/list', raw, httpOptions).subscribe((res) => {
      console.log("file list", res)
      this.folders = res
      this.dataSource = this.folders;
    })
  }
  ngOnInit(): void {

    this.dataSource.sort = this.sort;
    setTimeout(() => {
      console.log("calling from oninit", localStorage.getItem('token'))
      const data = { path: '' }

      this.accesstoken = localStorage.getItem('token')
      var raw = JSON.stringify({
        "path": this.postpath
      })

      const httpOptions = {
        headers: new HttpHeaders({
          'X-Firebase-AppCheck': this.accesstoken,
          'Content-Type': 'application/json'
        })
      };
      this.http.get(URL + '/user', httpOptions).subscribe((res: any) => {
        console.log("from oninit", res.photo_url)
        // localStorage.setItem('photo_url',JSON.stringify(res.photo_url))
        // localStorage.setItem('name',res.name)
        // localStorage.setItem('primary_email',res.primary_email)
        // localStorage.setItem('secondary_email',res.secondary_email)
        this.user.name = res.name;
        this.user.photo_url = res.photo_url;
        this.user.primary_email = res.primary_email;
        this.user.secondary_email = res.secondary_email
      })
      console.log("constr", this.accesstoken)
      //user.photo_url = "https://storage.googleapis.com/vault-profile-1/65f53cdc-3924-4255-8e8a-f66e0a7edc42"
      this.photo_url = this.sanitizer.bypassSecurityTrustResourceUrl(this.user.photo_url);
      this.http.post(URL + '/list', raw, httpOptions).subscribe((res) => {
        console.log("file list", res)
        this.folders = res
        this.dataSource = this.folders;
      })
    }, 1000)
  }


}
@Component({
  selector: 'dialog-popup',
  templateUrl: 'dialog-popup.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class DialogPopup {
  constructor(
    public dialogRef: MatDialogRef<DialogPopup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  datasaved(data: string) {
    //console.log(data);
    //this.createFolder(data)
    this.dialogRef.close(data);
  }
}
@Component({
  selector: 'dialog-rename',
  templateUrl: 'rename-popup.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class RenamePopup {
  constructor(
    public dialogRef: MatDialogRef<RenamePopup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogResp,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  datasaved(data: string) {
    //console.log(data);
    //this.createFolder(data)
    this.dialogRef.close(data);
  }
}
@Component({
  selector: 'OTP-popup',
  templateUrl: 'OTP-popup.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class OTPPopup implements OnInit {
  issubmitButtonDisabled = false;
  isresendButtonDisabled = true;
  otpentered = ''
  constructor(
    private fopr: FileoperationsService,
    public dialogRef: MatDialogRef<OTPPopup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogOTP,
  ) { }

  resendOtp(): void {
    this.dialogRef.close({ buttonClicked: 'resend', inputValue: this.otpentered });
  }
  ngOnInit() {
    setTimeout(() => {
      this.issubmitButtonDisabled = true;
      this.isresendButtonDisabled = false;
    }, 60000);
  }
  OtpSubmitted(data: string) {
    this.fopr.otp = this.otpentered
    console.log("printing the otp", this.otpentered)
    this.dialogRef.close({ buttonClicked: 'submit', inputValue: this.otpentered });
  }
}
@Component({
  selector: 'OTPfail-popup',
  templateUrl: 'OTPfail-popup.html',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class OTPfailPopup {
  constructor(
    public dialogRef: MatDialogRef<OTPfailPopup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogOTP,
  ) { }

  onclose() {
    this.dialogRef.close()
  }
}
