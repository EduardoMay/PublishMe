import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private _authService: AuthUserService) { }

  ngOnInit() {
    this._authService.isAuth().subscribe( userData => console.log(userData));
  }

  /**
   * cerrar sesion
  */
  public isLogout() {
    this._authService.logoutUser();
  }

}
