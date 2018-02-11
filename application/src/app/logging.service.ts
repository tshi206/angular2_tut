import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  private num: number = 0;

  log(){
    this.num++;
    console.log(`logging: ${this.num}`)
  }

  constructor() { }

}
