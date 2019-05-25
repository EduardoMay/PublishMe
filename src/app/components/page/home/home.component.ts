import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Publication } from 'src/app/models/publication';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public textPublication: string;
  public publications: Publication[];

  constructor(private _publicationService: DataService) { }

  ngOnInit() {
    this.getAllPublications();
  }

  /**
   * get all the publications
   */
  public async getAllPublications() {
    const publications = await this._publicationService.getAllPublications();
    publications.subscribe(data => this.publications = data);
  }

  /**
   * validar el formulario para realizar una publicacion
   */
  public validationFormNewPublication(form: NgForm) {
    if (form.valid === true ) {
      // save new publication
    } else {
      // no text

    }
  }

  /**
   * save new publication
   */
  public saveNewPublication() {}

}
