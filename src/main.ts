// Attempt to do a tiny bit of RxJS processing, the point is not this code but
// rather to demonstrate that RxJS made it through tsickle and Closure okay.

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';

const source = Observable.from([{name: 'Joe', age: 31}, {name: 'Bob', age:25}]);
const example = source.filter(person => person.age >= 30);
example.subscribe(val => console.log(`Over 30: ${val.name}`));
