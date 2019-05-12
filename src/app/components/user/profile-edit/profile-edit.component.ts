import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  public name = '';
  public lastName = '';
  public userName = '';
  public date = '';

  public switchPersonalDate = true;
  public switchProfilePhoto = false;

  public statusForm = {
    name: false,
    lastName: false,
    userName: false,
    date: false
  };

  private validationText = /([a-zA-Z])/i;

  constructor(private _authService: AuthUserService,
              private _userServices: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  public validateFormPersonalDate( formPersonalDate: NgForm ) {
    console.log(formPersonalDate);
    if ( formPersonalDate.valid === true) {
      // funcion para guardar los datos


    } else {
      // Validation input "name"
      if ( this.name === '' ) {
        this.statusForm.name = true;
      } else if ( !this.validationText.test(this.name) ) {
        this.statusForm.name = true;
      }

      // Validation input "lastName"
      if ( this.lastName === '' ) {
        this.statusForm.lastName = true;
      } else if ( !this.validationText.test(this.lastName) ) {
        this.statusForm.lastName = true;
      }

      // Validation input "username"
      if ( this.userName === '' ) {
        this.statusForm.userName = true;
      } else if ( !this.validationText.test(this.userName) ) {
        this.statusForm.userName = true;
      }

      // validation input "date"
      if ( this.date === '' ) {
        this.statusForm.date = true;
      }
    }

    setTimeout(() => {
      this.statusForm.name = false;
      this.statusForm.lastName = false;
      this.statusForm.userName = false;
      this.statusForm.date = false;
    }, 3000);
  }

  private savePersonalDate() {}

  public buttonPersonalDate() {
    this.switchPersonalDate = !this.switchPersonalDate;
    this.switchProfilePhoto = false;
  }

  public buttonProfilePhoto() {
    this.switchProfilePhoto = !this.switchProfilePhoto;
    this.switchPersonalDate = false;
  }

}
