import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  public users: Observable<UserInterface[]>;
  private usersDoc: AngularFirestoreDocument<UserInterface>;
  private user: Observable<UserInterface>;

  constructor(private _afService: AngularFireAuth,
    private aFirestore: AngularFirestore,
    private router: Router) {
      this.usersCollection = this.aFirestore.collection<UserInterface>('users');
      this.users = this.usersCollection.valueChanges();
    }

  /**
   * registrar directamente a la base de datos
  */
  public registerUser( email: string, password: string, name: string ) {
    return new Promise( (resolve, reject) => {
      this._afService.auth.createUserWithEmailAndPassword(email, password)
        .then( userData => {
          resolve(userData);
          // update
          this.updateUserData(userData.user, name);
        })
        .catch( err => reject(err));
    });
  }

  /**
   * actualiza la informacion del usuario
  */
  public updateUserData( user, newName: string ) {
    const userRef: AngularFirestoreDocument<any> = this.aFirestore.doc(`users/${user.uid}`);
    if (newName === null) {
      const data: UserInterface = {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        roles: {
          miembro: true
        }
      };

      return userRef.set(data, {merge: true});
    } else {
      const data: UserInterface = {
        id: user.uid,
        email: user.email,
        name: newName,
        roles: {
          miembro: true
        }
      };

      return userRef.set(data, {merge: true});
    }
  }

  /**
   * conocer el estatus del usuario logeado
  */
  public isAuth() {
    return this._afService.authState.pipe( map( isAuth => isAuth));
  }

  /**
   * cerrar sesion
  */
  public logoutUser() {
    return this._afService.auth.signOut()
      .then( () => {
        this.router.navigate(['/']);
      });
  }
}
