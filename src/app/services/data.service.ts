import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publication } from '../models/publication';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private publicationsCollection: AngularFirestoreCollection<Publication>;
  public publications: Observable<Publication[]>;
  private publicatiosDocument: AngularFirestoreDocument<Publication>;
  private publication: Observable<Publication>;
  public selectedPublication: Publication = {
    id: null,
  };

  constructor(private angularFIrestore: AngularFirestore) {
    this.publicationsCollection = this.angularFIrestore.collection<Publication>('publications', ref => ref.orderBy('fecha', 'desc'));
    this.publications = this.publicationsCollection.valueChanges();
  }

  /**
   * get all the publications
   */
  public async getAllPublications() {
    this.publications = await this.publicationsCollection.snapshotChanges()
      .pipe( map( changes => {
        return changes.map( action => {
          const data = action.payload.doc.data() as Publication;
          data.id = action.payload.doc.id;
          return data;
        });
      }));

    return this.publications;
  }

  /**
   * save publication to firebase : Promise<Publication>
   */
  public async addPublication( data: Publication ): Promise<Publication> {
    const newPublication = await this.publicationsCollection.add(data);
    return newPublication;
  }
}
