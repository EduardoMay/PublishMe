import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { UserInterface } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  @ViewChild('imageUser') inputImageUser: ElementRef;
  private IDUSER: string;
  private USERNAME: string;

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

  public uploadPercent: Observable<number>; // pocentaje de la subida de la imagen
  public urlImage: Observable<string>; // url de la imagen donde se guarda en la base de datos
  private idPhoto: string;

  constructor(private _authService: AuthUserService,
              private _userService: UserService,
              private router: Router,
              private angStorage: AngularFireStorage) { }

  ngOnInit() {

    this.getCurrentUser();

  }

  // obtener la informacion del usuario
  private getCurrentUser() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        this.IDUSER = userData.uid;
        this.USERNAME = userData.displayName;
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

  // guardar informacion del usuario
  private savePersonalDate( dataPersonal: {} ) {
    this._userService.updateInfoUser(this.IDUSER, dataPersonal);
  }

  // guardar foto y actualizar foto de perfil
  public uploadPhotoUser() {
    const data = this.isAuth().subscribe( userData => {
      if ( userData ) {
        const inputImage = this.inputImageUser.nativeElement.value;

        userData.updateProfile({
          displayName: this.USERNAME,
          photoURL: inputImage
        }).then( () => {

          this._userService.updateProfileUrl(this.IDUSER, userData.photoURL, this.idPhoto);
          console.log('Foto guardado');

        }).catch( () => {
          console.log('Error al guardar la foto de perfil');
        });
      }
    });
  }

  // guardando la imagen en firestore
  public savingPhotoToFIrestore( e ) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    this.idPhoto = `profile_${id}`;
    const filePath = `photoUser/${this.idPhoto}`;
    const ref = this.angStorage.ref(filePath);
    const task = this.angStorage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();

    task.snapshotChanges().pipe( finalize( () => {
      this.urlImage = ref.getDownloadURL();
    })).subscribe();
  }

  private isAuth() {
    return this._authService.isAuth();
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
