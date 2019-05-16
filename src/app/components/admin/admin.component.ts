import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserInterface } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private _USERID: string;
  public _DATAUSER: UserInterface = {};

  constructor(private _usersServices: UserService,
    private _authService: AuthUserService) { }

  ngOnInit() {
    this.isAuth();
  }

  /**
   * obtener la informacion del usuario logeado
   */
  private isAuth() {
    this._authService.isAuth().subscribe( data => {

      this._USERID = data.uid;

      if ( this._USERID !== '' ) {

        this._usersServices.getCurrentUser(this._USERID).subscribe( dataUser => {
          this._DATAUSER = dataUser;
        });

      }
    });
  }

}
