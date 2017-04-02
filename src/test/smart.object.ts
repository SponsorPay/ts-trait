
import {IEventEmitter, EventEmitter, EventHandler} from "./event.emitter";
import {applyMixins} from "../apply.mixin";

export class SmartBase {
  someLogic: string;

  constructor() {
    this.someLogic = 'someLogic';
  }

}

export class SmartObject extends SmartBase implements IEventEmitter {

  // EventEmitter declarations - now SmartObject class knows that "all" property is used by EventEmitter
  all: {[type: string]: EventHandler[]};

  constructor() {
    super();
    EventEmitter.Init.apply(this, arguments);
  }

  // override EventEmitter.on, use super
  on(type: string, handler: EventHandler){
    EventEmitter.prototype.on.apply(this, arguments); // super
    console.log('SmartObject.on');
  }
  // EventEmitter declarations
  off: (type: string, handler: EventHandler) => void;
  emit: (type: string, evt: any) => void;
}

applyMixins(SmartObject, [EventEmitter]);
