import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/**
 * ngModel needs to import FormsModule now. In your app.module,
 * add this following line at the top.
 *    import { FormsModule }   from '@angular/forms';
 *
 * and also add FormsModule in imports .
 *       imports: [
 *       BrowserModule,
 *       FormsModule
 *       ]﻿
 *
 * This is to enable the directive 'ngModel' in vanilla html. By default, the <input>
 *     tags do not have any property called 'ngModel' so we have to import them manually
 *     in the app.module so that we can use this Angular directive in vanilla html.
 * Example:
 *      <input [(ngModel)]="<your_component's_property>" />
 */
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule} from "angularfire2/database";


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DirectoryComponent } from './directory/directory.component';
import { RouterModule, Routes } from "@angular/router";
import { FilterPipe } from './filter.pipe';
import { LoggingService } from './logging.service';
import { DataService } from './data.service';


// Since RC5, external services are no longer directly fed into main.ts
// Instead, they are fed in here the app.module which wraps up our app.component (root)
// Routes are defined as an array of objects like so:
const appRoutes: Routes = [
  // Unlike middleware in Express where URLs are mapped via prefix,
  //  e.g., middleware that maps to '/abc' can also handle '/abc/def/...'
  //  Angular uses EXACT-MATCH in mapping routes to components.
  // Hence DirectoryComponent is overloaded by two URls.
  //  Using Angular's Router, a component that maps to '/abc' can ONLY handle '/abc',
  //  it CANNOT handle any url follows the pattern such as '/abc/def'
  { path: 'directory', component: DirectoryComponent}, // url: '/directory'
  { path: 'directory/:ninja', component: DirectoryComponent}, // url: '/directory/:ninja'
  { path: '', component: HomeComponent} // empty path "" means '/', the root url
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DirectoryComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    /*
      Note:
          firebase/database refers to the old real-time database in Firebase.
          firebase/firestore refers to the new Cloud Firestore database in Firebase.
          They are DIFFERENT.
          In this application, only the real-time database is used in the backend.
          The other two modules below are NOT used in this application, they are
          added as a demonstration on how to import different firebase modules into
          your Angular project, via Angularfire2 API.
     */
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features, NOT USED
    AngularFireStorageModule, // imports firebase/storage only needed for storage features, NOT USED
    RouterModule.forRoot(appRoutes) // Add here array with paths and components to load the routes
  ],
  // The 'provider' property:
  // Inject any service at the root level so that Angular will only create
  // one instance of it and share the SAME object among different components that
  // are requiring it
  providers: [LoggingService, DataService], // Declare any injection here for singleton-sharing
  bootstrap: [AppComponent]
})
export class AppModule { }
