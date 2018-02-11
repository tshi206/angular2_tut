import { Pipe, PipeTransform } from '@angular/core';

// Ninja :: {name: string, belt: string}
type Ninja = {name: string, belt: string};

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * A naive implementation of Array.filter(cb) wrapped by PipeTransform interface
   * @param {Ninja[]} ninjas
   * @param {string} term
   * @returns {Ninja[]}
   */
  transform(ninjas: Ninja[], term: string): Ninja[] {
    // if user doesn't type anything
    if (term === undefined) return ninjas;
    // otherwise return a filtered array based on user's input
    return ninjas.filter(ninja =>
      {return ninja.name.trim().toLowerCase().includes(term.trim().toLowerCase())})
  }

}
