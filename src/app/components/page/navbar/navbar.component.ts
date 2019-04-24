import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currentUser = {
    status: false,
    name: 'Prueba'
  };

  public dataUser = {
    name: 'Prueba',
    photoUrl: null
  };

  constructor() { }

  ngOnInit() {
  }

  // CERRAR SESION
  public onLogout() {}

}
