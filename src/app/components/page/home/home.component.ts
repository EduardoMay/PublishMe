import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public textPublication: string;

  constructor() { }

  ngOnInit() {
    this.notKeyPressEnter();
  }

  /**
   * bloquear la tecla 13/Enter
   */
  private notKeyPressEnter() {
    $('form').keypress( e => {
      if (e.keyCode === 13) {
        return false;
      }
    });
  }

  /**
   * validar el formulario para realizar una publicacion
   */
  public validationFormNewPublication(ngForm: NgForm) {
    console.log(ngForm);
  }

}
