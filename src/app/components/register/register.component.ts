import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';
  name : string = ''
  retypePassword: string; // New property for retype password
  retypePasswordTouched = false;
  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    localStorage.clear()
  }
  isPasswordValid(): boolean {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharacterRegex = /[!@#$&^&*]/;
  
    // Check if the password meets the specified conditions
    const conditionsMet =
    (lowercaseRegex.test(this.password) ? 1 : 0) +
    (uppercaseRegex.test(this.password) ? 1 : 0) +
    (digitRegex.test(this.password) ? 1 : 0) +
    (specialCharacterRegex.test(this.password) ? 1 : 0);

  const hasRequiredConditions = conditionsMet >= 3;
  
    // Check for no more than 2 identical characters in a row
    const hasNoMoreThanTwoIdenticalCharacters = !/(.)\1\1/.test(this.password);
  
    return this.password && this.password.length >= 10 && hasRequiredConditions && hasNoMoreThanTwoIdenticalCharacters;
  }


  onRetypePasswordChange() {
    // Check if the retype password matches the original password
    if (this.retypePasswordTouched && this.password && this.retypePassword && this.password !== this.retypePassword) {
      // Handle the case where passwords do not match (show error message, etc.)
      console.error("Passwords do not match");
    }
  }

  onRetypePasswordBlur() {
    // Set the touched flag to true when the field is blurred
    this.retypePasswordTouched = true;
    // Check if the retype password matches the original password
    if (this.password && this.retypePassword && this.password !== this.retypePassword) {
      // Handle the case where passwords do not match (show error message, etc.)
      console.error("Passwords do not match");
    }
  }
  register() {

    if(this.name == '') {
      alert('Please enter name');
      return;
    } 
    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }
    this.auth.register(this.name,this.email,this.password);
    this.email = '';
    this.password = '';

  }

}