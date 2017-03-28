import {Trait} from "../apply.mixin";
require('chai').should();
import {SmartObject, SmartBase} from "./smart.object";
import {EventEmitter} from "./event.emitter";
describe('smart object', function () {
  it('should mix event emitter', () => {
    const smart = new SmartObject();
    (smart instanceof SmartObject).should.eq(true);
    (smart instanceof SmartBase).should.eq(true);
    // (smart instanceof EventEmitter).should.eq(true);
    ((<Trait>EventEmitter).isInstanceOf(smart)).should.eq(true);
  })
});
