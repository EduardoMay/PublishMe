import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { UserInterface } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: UserInterface[];

  constructor(private _usersServices: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  /**
   * obtener todos los usuarios
   */
  public getAllUsers() {
    this._usersServices.getAllUsers().subscribe( dataUsers => {

      this.users = dataUsers;

    });
  }

}
