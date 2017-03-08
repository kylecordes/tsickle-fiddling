// Attempt to do a tiny bit of RxJS processing, the point is not this code but
// rather to demonstrate that RxJS made it through tsickle and Closure okay.

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';


// * Consuming application code must do: `import 'rxjs/add/observable/empty';`
// to make .empty() available so Notification can be compiled by Closure. I
// believe this indicates some difficulty in how dependencies are translated
// from TypeScript to Closure - but it is surprising that this is the only
// symptom of such a problem. Hopefully this means it is a minor problem.

import 'rxjs/add/observable/empty';


const source = Observable.from([{name: 'Joe', age: 31}, {name: 'Bob', age:25}]);
const example = source.filter(person => person.age >= 30);
example.subscribe(val => console.log(`Over 30: ${val.name}`));
