import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Publication } from 'src/app/models/publication';
import { AuthUserService } from 'src/app/services/auth-user.service';
import { UserInterface } from 'src/app/models/user';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public ISAUTH = false;
  private DATAUSER: UserInterface = {};

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

      // USER ID
      this.DATAUSER.id = (auth) ? auth.uid : null;

      // USER ID
      this.DATAUSER.username = (auth) ? auth.uid : null;

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
      // USER MODEL INFO
      const dataUser: Publication = {
        userId: this.DATAUSER.id,
        descripcion: this.textPublication,
        autor: this.DATAUSER.username,
        fecha: new Date().getTime(),
      };

      console.log(dataUser);

      // save new publication
      // this._publicationService.addPublicatin();
    } else {
      // no text
      console.log(false);
    }
  }

  /**
   * save new publication
   */
  public saveNewPublication() {}

}
