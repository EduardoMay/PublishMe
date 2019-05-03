import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { UserInterface } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public statusLoginUser = false;
  public detailUser: UserInterface = {};

  constructor(private router: Router, private _authService: AuthUserService) { }

  ngOnInit() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        console.log(userData);

        this.statusLoginUser = true;

        this.detailUser.name = userData.displayName;
        this.detailUser.id = userData.uid;
        this.detailUser.photoUrl = userData.photoURL;
      } else {
        this.statusLoginUser = false;
      }
    });
  }

  /**
   * cerrar sesion
  */
  public isLogout() {
    this._authService.logoutUser();
  }

}
