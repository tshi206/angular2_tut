import { Component } from '@angular/core';

// in the latter version of Angular (e.g. 4.x upwards), manually importing nested
// component is no longer required. In addition, the property 'directives' has been
// removed from the @Component's object literal as it is no longer needed either.
//import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
/*
  // Custom property binding plus @Input to send data from one component to another
  // data to be sent to another component (e.g. home.component)
  ninja = {
    name: "Zed",
    belt: "Black"
  };

  yell(e){
    alert('I am yelling');
    console.log(e)
  }
*/
}
