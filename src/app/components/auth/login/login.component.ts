import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public emailUser = '';
  public passwordUser = '';
  private textEmail = false;
  private textPassword = false;
  private validationEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  constructor(private _authService: AuthUserService,
              private router: Router) { }

  ngOnInit() {
  }

  public verificationForm( formLoginUser: NgForm ) {

  /**
   * VERIFICAR EMAIL NO ESTE VACIO Y VERIFICADO
   * VERIFICAR EMAIL Y PASSWORD ESTEN VACIOS
  */
    console.log(formLoginUser);

    if ( formLoginUser.valid === true ) {
      if ( this.validationEmail.test(this.emailUser) ) {

        this._authService.loginEmailPasswordUser(this.emailUser, this.passwordUser)
          .then( res => {
            this.onLoginRedirect();
          })
          .catch( err => {
            console.log('Error al iniciar sesion', err.message);
          });

      } else {
        this.textEmail = true;
      }
    } else {
      if (this.emailUser === '') {
        this.textEmail = true;
      } else if ( !this.validationEmail.test(this.emailUser) ) {
        this.textEmail = true;
      }

      if (this.passwordUser === '') {
        this.textPassword = true;
      }
    }

    setTimeout(() => {
      this.textEmail = false;
      this.textPassword = false;
    }, 3000);
  }

  /**
   * redireccionar al iniciao
  */
  public onLoginRedirect() {
   this.router.navigate(['inicio']);
  }
}
