import {SmartBase, SmartObject} from "./smart.object";
import {EventEmitter} from "./event.emitter";
require('chai').should();


describe('smart object', function () {
  it('should mix event emitter', () => {
    const smart = new SmartObject();
    (smart instanceof SmartObject).should.eq(true);
    (smart instanceof SmartBase).should.eq(true);
    // (smart instanceof EventEmitter).should.eq(true);
    EventEmitter.hasInstance(smart).should.eq(true);
    (smart.off === EventEmitter.prototype.off).should.eq(true);
    smart.all.should.deep.eq({});
    smart.on('someEvent', () => {
    });
  })
});
