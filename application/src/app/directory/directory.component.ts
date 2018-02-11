import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule} from "@angular/router";
import { LoggingService } from '../logging.service';
import { DataService } from "../data.service";

type Ninja = {name: string, belt: string}
type NinjaWithKey = {key: string, name: string, belt: string}

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
  // If the service is provided to each component individually like the following:
  // @Component({
  //      ...
  //      providers: [ LoggingService ]
  // })
  // Angular will create a NEW instance of the service in each component when the
  // component is initialized. Hence, each component will have its own copy of instance
  // for the same service, and all those instances are DIFFERENT object therefore
  // consisting of different states.
  // If creating multiple objects are not the desired behaviour, it is reasonable
  // to use Singleton design when creating the service class. However, since Angular
  // is controlling the project, we don't, and shouldn't create the Singleton class
  // manually, instead, we can easily achieve this by adding the 'providers' property
  // in app.module.ts as the following:
  /*
        ...
        import { LoggingService } from './logging.service';
        ...

              @NgModule({
              declarations: [
                ...
              ],
              imports: [
                 ...
              ],
              providers: [LoggingService],
              bootstrap: [AppComponent]
            })
            export class AppModule { }
   */
})
export class DirectoryComponent implements OnInit {

  ninja: string;

  /*
  classes = { 'blue': true, 'red': false, 'underline': true };
  test = true;
  */

  ninjas = [];

  term;

  constructor(private route: ActivatedRoute
              , private logger: LoggingService
              , private dataService: DataService) {
    // route.snapshot.params is of type Params (i.e. it's an Object)
    // route.snapshot is a property that holds the current state of the route
    this.ninja = route.snapshot.params['ninja'];
  }

  ngOnInit() {
    /*
    this.dataService.fetchData().subscribe({
      next: value => this.ninjas = value,
      error: err => {throw err},
      complete: () => {console.log('data received')}
    })
    */
    /*
    this.dataService.fetchDataViaAngularfire2()
      //.pipe(payload => {console.log(payload); return payload})
      .subscribe({
        next: value => {this.ninjas = value; console.log(value); return value},
        error: err => {throw err},
        complete: () => {console.log('data received via Angularfire2')}
      });
    */
    this.dataService.fetchDataViaAngularfire2WithSnapshotChanges()
      .subscribe({
        next: value => {this.ninjas = value; console.log(value); return value},
        error: err => {throw err},
        complete: () => {console.log('data received with keys via Angularfire2')}
      })
  }

  logIt(){
    this.logger.log()
  }

  fbPostData(name: string | undefined, belt: string | undefined){
    if (name !== undefined && belt !== undefined && name !== "" && belt !== "")
      this.dataService.pushDataViaAngularfire2(name, belt)
  }

  fbDeleteData(obj: NinjaWithKey){
    this.dataService.deleteDataViaAngularfire2(obj.key)
  }

}
