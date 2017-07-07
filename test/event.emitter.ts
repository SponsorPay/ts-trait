import {Trait} from "../src/trait";

export interface IEventEmitter {
  all: { [type: string]: EventHandler[] };
  on(type: string, handler: EventHandler): void;
  off(type: string, handler: EventHandler): void;
  emit(type: string, evt: any): void;
}
export type EventHandler = (event?: any) => void;

export interface EventEmitter extends IEventEmitter, Trait {

}

// heavily based on https://github.com/developit/mitt
export class EventEmitter extends Trait {
  // static [Symbol.hasInstance](instance: any) :boolean {
  //   return (<Trait>EventEmitter).hasInstance(instance);
  // }

  init() {
    this.all = {};
  }

  all: { [type: string]: EventHandler[] };

  on(type: string, handler: EventHandler) {
    console.log('EventEmitter on');
    (this.all[type] || (this.all[type] = [])).push(handler);
  }

  off(type: string, handler: EventHandler) {
    let e = this.all[type] || (this.all[type] = []);
    e.splice(e.indexOf(handler) >>> 0, 1);
  }

  emit(type: string, evt: any) {
    (this.all[type] || []).map((handler) => {
      handler(evt);
    });
  }
}
