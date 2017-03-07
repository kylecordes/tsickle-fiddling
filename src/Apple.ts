export class Apple {

  eatApple(consumer: (x: string) => string) {
    return consumer('yummy');
  }

}
