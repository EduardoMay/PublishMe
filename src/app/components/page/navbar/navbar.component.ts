import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { UserInterface } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public _IDUSER: string;
  public _INFOUSER: UserInterface = {};

  public statusLoginUser = false;

  constructor(private router: Router,
    private _authService: AuthUserService,
    private _userService: UserService) { }

  ngOnInit() {
    this.isAuthUser();
  }

  /**
   * Si el usuario ha iniciado sesion
   */
  public isAuthUser() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        // console.log(userData);

        this._IDUSER = userData.uid;

        this.statusLoginUser = true;

        this.getCurrentInfoUser();
      } else {
        this.statusLoginUser = false;
      }
    });
  }

  /**
   * Obtener la informacion del usuario
   */
  public getCurrentInfoUser() {
    if ( this._IDUSER !== '' ) {
      this._userService.getCurrentUser( this._IDUSER ).subscribe( userData => {
        if (userData) {
          this._INFOUSER = userData;
          console.log('info user:', userData);
        } else {
          console.error('Error');
          this._INFOUSER = null;
        }
      });
    }
  }

  /**
   * cerrar sesion
  */
  public isLogout() {
    this._authService.logoutUser();
  }

}
