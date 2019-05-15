import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  public users: Observable<UserInterface[]>;
  private usersDoc: AngularFirestoreDocument<UserInterface>;
  private user: Observable<UserInterface>;
  public selectedUser: UserInterface = {};

  constructor(private angularFirestore: AngularFirestore) {
    this.usersCollection = this.angularFirestore.collection<UserInterface>('users');
    this.users = this.usersCollection.valueChanges();
  }

  /**
   * Obtener todos los usuarios
  */
  public getAllUsers() {
    return this.users = this.usersCollection.snapshotChanges()
      .pipe( map( changes => {
        return changes.map( action => {
          const data = action.payload.doc.data();
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  /**
   * Obtener los datos del usuario actual
  */
  public getCurrentUser( idUser ) {
    this.usersDoc = this.angularFirestore.doc<UserInterface>(`users/${idUser}`);
    return this.user = this.usersDoc.snapshotChanges().pipe( map( action => {
      if ( action.payload.exists === false ) {
        return null;
      } else {
        const data = action.payload.data() as UserInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  // actualizar la informacion del usuario
  public updateInfoUser( idUser, data ) {
    const userRef = this.angularFirestore.doc<UserInterface>(`users/${idUser}`);
    userRef.update(data).then( () => {
      return console.log('GUardado');
    }).catch( err => {
      return console.log('Error al guardar', err);
    });
  }

  // guardar url de la foto de perfil
  public updateProfileUrl(userID: string, photoUrl: string, idPhoto: string) {

    if ( idPhoto === null) {
      const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${userID}`);

      const data: UserInterface = {
        photoUrl: photoUrl
      };

      return userRef.set(data, {merge: true});
    } else {
      const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${userID}`);

      const data: UserInterface = {
        idPhoto: idPhoto,
        photoUrl: photoUrl
      };

      return userRef.set(data, {merge: true});
    }
  }
}
