import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { UserInterface } from 'src/app/models/user';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  private IDUSER: string;

  // datos del formulario
  public name = '';
  public lastName = '';
  public userName = '';
  public date = '';

  // poder cambiar de pestaña
  public switchPersonalDate = true;
  public switchProfilePhoto = false;

  public statusForm = {
    name: false,
    lastName: false,
    userName: false,
    date: false
  };

  private dataPersonal: UserInterface = {};

  private validationText = /([a-zA-Z])/i;

  constructor(private _authService: AuthUserService,
              private _userServices: UserService,
              private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  // obtener la informacion del usuario
  private getCurrentUser() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        this.IDUSER = userData.uid;
      }
    });
  }

  // validar el formulario
  public validateFormPersonalDate( formPersonalDate: NgForm ) {
    console.log(formPersonalDate);
    if ( formPersonalDate.valid === true) {
      // funcion para guardar los datos
      this.dataPersonal.name = this.name;
      this.dataPersonal.lastname = this.lastName;
      this.dataPersonal.username = this.userName;
      this.dataPersonal.date = this.date;

      this.savePersonalDate( this.dataPersonal );
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

  private savePersonalDate( dataPersonal: {} ) {
    this._userServices.updateInfoUser(this.IDUSER, dataPersonal);
  }

  public buttonPersonalDate() {
    this.switchPersonalDate = !this.switchPersonalDate;
    this.switchProfilePhoto = false;
  }

  public buttonProfilePhoto() {
    this.switchProfilePhoto = !this.switchProfilePhoto;
    this.switchPersonalDate = false;
  }

}
