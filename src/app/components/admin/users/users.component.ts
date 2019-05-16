import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthUserService } from 'src/app/services/auth-user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _usersServices: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  /**
   * obtener todos los usuarios
   */
  public getAllUsers() {
    this._usersServices.getAllUsers().subscribe( dataUsers => {
      console.log(dataUsers);
    });
  }

}
