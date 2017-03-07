goog.module('tsickle_output.Box'); exports = {}; var module = {id: 'tsickle-output/Box.js'};import { Apple } from './Apple';
const Apple = Apple; /* local alias for Closure JSDoc */
/* local alias for Closure JSDoc */ export class Box {
    constructor() {
        this.apple = new Apple();
    }
    /**
     * @return {void}
     */
    go() {
        const /** @type {string} */ result = this.apple.eatApple((x) => 'Hello, here is the output: ' + x);
        console.log(result);
    }
}
function Box_tsickle_Closure_declarations() {
    /** @type {!Apple} */
    Box.prototype.apple;
}
new Box().go();
//# sourceMappingURL=Box.js.map