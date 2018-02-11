import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
// rxjs
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from 'angularfire2/database';

type Ninja = {name: string, belt: string}

@Injectable()
export class DataService {

  constructor(protected httpClient: HttpClient,
              private db: AngularFireDatabase) { }

  // directly fetch the JSON hosted in the Firebase (via the endpoint URL),
  // using Firebase endpoint URL to assemble an GET request
  fetchData(): Observable<Ninja[]>{
    return this.httpClient.get<Ninja[]>('https://ninja-24c60.firebaseio.com/.json').pipe(
      data => {console.log(data); return data}
    )
  }

  /**
   * Fetch the collection at the root level '/' in the database using Angularfire2 API.
   * This is equivalent to the following in native Firebase API:
   *
   *      firebase.database().ref('someLocation').on('value', snapshot=>{
   *           //do something with your data
   *           //to access the Object stored in the snapshot use: snapshot.val()
   *       })
   *
   *  Note that in the Firebase API, each snapshot carries an Object (i.e. item)
   *  of the collection upon every 'value' event is fired. Hence a snapshot represents
   *  an item and a snapshot wraps the item Object together with some other meta-data.
   *
   *  While in THIS method using Angularfire2, the api method we use returns the
   *  collection as a whole (i.e. the array itself) instead of individual items whenever
   *  a 'value' event gets emitted. Angularfire2 is Observable-based so this method
   *  returns an Observable of an array containing ALL items in the current snapshot
   *  of the remote collection.
   *
   *  For more information on the difference between Firebase API and Angularfire2,
   *  see:
   *  https://firebase.google.com/docs/database/web/read-and-write
   *  https://github.com/angular/angularfire2/issues/380
   */
  fetchDataViaAngularfire2(): Observable<Ninja[]>{
    // Data is retrieved through the AngularFireDatabase service.
    // The service is also generic. Provide the singular type and not the array type.
    return this.db.list<Ninja>('/').valueChanges()
  }

  /**
   * This one preserves all the meta-data in the snapshot, e.g. $keys.
   * For more info see:
   * https://github.com/angular/angularfire2/issues/1283
   * https://stackoverflow.com/questions/46587495/angularfire2-realtime-database-how-to-get-key-and-value
   * @returns {Observable<any>}
   */
  fetchDataViaAngularfire2WithSnapshotChanges(){
    // Use snapshotChanges().map() to store the key
    // snapshotChanges() returns Observable<SnapshotAction[]>
    // essentially, the following code maps SnapshotAction array to a new array of
    // custom Objects.
    // The equivalent code can be:
    /*
        this.db.list<Ninja>('/').snapshotChanges().map(actions => {
          // 'actions', the snapshot of the collection
          // 'a', the individual item snapshot in the collection's snapshot
          return actions.map(a => {
            const data = a.payload.val(); // get the item Object (i.e. the JSON stored)
            const id = a.payload.id; // get the preserved key (the unique 'index')
            return { id, ...data }; // custom Object contains key and the original JSON
          });
        });
     */
    return this.db.list<Ninja>('/').snapshotChanges().map(changes => {
      console.log(changes);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    })
  }

  /**
   * Push (add) an Object of type Ninja to the Firebase real-time database,
   * using Angularfire2 API.
   * The targeted collection is the one at the root level in the remote service.
   * Root level URL : '/'.
   * @param {string} name
   * @param {string} belt
   */
  pushDataViaAngularfire2(name: string, belt: string){
    // Remember to use the singular type Ninja instead of Ninja[]
    // db.list expects a singular generic and will pluralize it automatically
    // for example, Ninja will be pluralized to Ninja[]
    // while Ninja[] will be pluralized to Ninja[][]
    // make sure all types are matching for all time (e.g. using customized type-guards
    // to enhance type-check)
    this.db.list<Ninja>('/').push({name: name, belt: belt})
      .then(ref => console.log(`Posting done. REF: ${ref}`),
        reason => {throw reason})
    // Note that push returns a ThenableReference (which extends PromiseLike<Reference>).
    // The PromiseLike<T> interface in es6 only provides the then() method. So trying to
    // call catch() on a PromiseLike<T> will cause compilation error. Instead, the
    // then() in PromiseLike<T> responses to both success and failure.
    // Thus, PromiseLike<T>.then() takes TWO callbacks instead of one, as the following
    // form:
    //   then<TResult1 = T, TResult2 = never>(
    //      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    //      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
    //   ): PromiseLike<TResult1 | TResult2>;
  }

  /**
   * Remove an item from the collection in terms of the supplied key.
   * @param {string} key
   */
  deleteDataViaAngularfire2(key: string){
    this.db.list<Ninja>('/').remove(key).catch(err => {throw err})
  }

}
