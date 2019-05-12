import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public name = '';
  public lastName = '';
  public userName = '';
  public date = '';

  constructor() { }

  ngOnInit() {
  }

  public validateFormPersonalDate( form: NgForm ) {
    console.log(form);
  }

}
