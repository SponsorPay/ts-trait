
import {EventEmitter, EventHandler} from "./event.emitter";
import {applyMixins} from "../src/apply.mixin";

export class SmartBase {
  someLogic: string;

  constructor() {
    this.someLogic = 'someLogic';
  }
}

export interface SmartObject extends EventEmitter {

}

@applyMixins([EventEmitter])
export class SmartObject extends SmartBase {
  constructor() {
    super();
    EventEmitter.prototype.init.apply(this, arguments);
  }

  // override EventEmitter.on, use super
  on(type: string, handler: EventHandler){
    EventEmitter.prototype.on.apply(this, arguments); // super
    console.log('SmartObject.on');
  }
}
