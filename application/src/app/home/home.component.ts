import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoggingService } from "../logging.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // One-way data binding: Into the view
  // String Interpolation in one way data binding via
  // {{<the stuff to pass to the view>}}
  // is ALWAYS going to resolve as String in the template
  homeTitle = 'Welcome to the home page...';

  /*
  myString: string = 'I love KFC';
  myBool : boolean = true;

  // Note that event binging's handlers cannot be made static
  // even though they can be defined as Function, rather than Method.
  alertMe(str) {
    alert(str)
  }

  alertMeAgain() {
    alert("I love KFC")
  }

  // This one is a Method not a Function so it must be non-static
  lastAlert(){
    this.alertMe(this.myString)
  }

  ninja = {
    name: "Yoshi",
    belt: "Black"
  };

  // Access the data stored in property 'ninja' from the directive 'app-home' in
  // app.component.html
  // Note that the Param 'ninja' passed in the Input's constructor is optional.
  // see @Input(bindingPropertyName?: string): any
  // if leave the constructor empty, the @Input() will take the property name
  // 'receivedNinja' as default and expect a property in the 'app-home' directive
  // called 'receivedNinja'
  @Input('ninja') receivedNinja;

  // Output this custom event so that it is accessible(listenable) to other components
  // This is achieved via creating this custom event and adding it as a property in the
  // 'app-home' directive inside root component's view.
  // see @Output(bindingPropertyName?: string): any
  // if leave the constructor empty, the @Output() will take the property name
  // 'yell' as default and can add a customized property in the 'app-home' directive
  // called 'yell', instead of the explicitly defined 'onYell' in the example below
  @Output('onYell') yell = new EventEmitter();

  fireYellEvent(e){
    this.yell.emit(e)
  }
*/
  constructor(private logger: LoggingService) { }

  ngOnInit() {
  }

  logIt(){
    this.logger.log()
  }

}
