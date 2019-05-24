import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public textPublication: string;

  constructor(private _publicationService: DataService) { }

  ngOnInit() {
    this.getAllPublications();
  }

  /**
   * get all the publications
   */
  public async getAllPublications() {
    const publications = await this._publicationService.getAllPublications();
    publications.subscribe(data => console.log(data));
  }

  /**
   * validar el formulario para realizar una publicacion
   */
  public validationFormNewPublication(ngForm: NgForm) {
    console.log(ngForm);
  }

}
