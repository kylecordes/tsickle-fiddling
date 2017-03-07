import { Apple } from './Apple';

export class Box {
  private apple: Apple;

  constructor() {
    this.apple = new Apple();
  }

  go() {
    const result = this.apple.eatApple((x) => 'Hello, here is the output: ' + x);
    console.log(result);
  }
}

new Box().go();
