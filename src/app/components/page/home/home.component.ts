import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Publication } from 'src/app/models/publication';
import { AuthUserService } from 'src/app/services/auth-user.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public ISAUTH = false;

  public textPublication: string;
  public publications: Publication[];

  constructor(private _publicationService: DataService,
    private _authService: AuthUserService) { }

  ngOnInit() {
    // auth
    this.isAuthUser();

    // GET ALL PUBLICATIONS
    this.getAllPublications();
  }

  /**
   * is auth
   */
  private isAuthUser() {
    this._authService.isAuth().subscribe(auth => {

      // STATUS LOGIN
      this.ISAUTH = (auth) ? true : false;

      console.log(this.ISAUTH);
    });
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
