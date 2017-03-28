
import {IEventEmitter, EventEmitter, EventHandler} from "./event.emitter";
import {applyMixins} from "../apply.mixin";

export class SmartBase {
  someLogic: string;

  constructor() {
    this.someLogic = 'someLogic';
  }

}

export class SmartObject extends SmartBase implements IEventEmitter {
  constructor() {
    super();
    EventEmitter.Init.apply(this, arguments);
  }

  // EventEmitter declarations
  on: (type: string, handler: EventHandler) => void;
  off: (type: string, handler: EventHandler) => void;
  emit: (type: string, evt: any) => void;
}

applyMixins(SmartObject, [EventEmitter]);
