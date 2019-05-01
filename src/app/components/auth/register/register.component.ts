import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public name = '';
  public email = '';
  public password = '';
  public repeatPassword = '';
  public confirmPasswordForm = true;

  constructor(private _authService: AuthUserService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Confirmar password
  */
  public confirmPassword(formRegister: NgForm) {
    console.log(formRegister);

    if (formRegister.valid) {
      if (this.password !== '' && this.repeatPassword !== '') {
        if (this.password === this.repeatPassword) {
          console.log(true);
          this.onRegister();
        } else {
          this.confirmPasswordForm = false;
        }
      }
    }
  }

  /**
   * REGISTRO DE USUARIO CON CORREO Y CONTRASEÑA
  */
  public onRegister() {
    this._authService.registerUser(this.email, this.password, this.name)
      .then( res => {
        this._authService.isAuth().subscribe( userData => {
          if (userData) {
            userData.updateProfile({
              displayName: this.name,
              photoURL: null
            }).then( () => {});
          }
        });
        this.router.navigate(['inicio']);
      })
      .catch( err => console.log('Error al registrarse', err.message));
  }

}
