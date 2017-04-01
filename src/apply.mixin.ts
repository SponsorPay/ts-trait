import {CounterByName} from "./util/counter.by.name";
const counterByName = new CounterByName();

export type Trait = Function & {
  new(...args: any[]): any;
  hasInstance?(instance: any): boolean;
  $$name?: string;
}

export type Derived = Function & {
  $is?: {[name: string]: boolean};
}

export function hasInstance(instance: any) {
  const base: Trait = this;
  const derived: Derived = instance && instance.constructor;
  return !!derived && derived.$is[base.$$name];
}

const assignMethodNoOverride = (derivedCtor: any, baseCtor: Trait) => (name: string) => {
  if (name !== 'constructor') {
    if (!derivedCtor.prototype[name]) {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    } else {
      console.warn(`Derived class "${derivedCtor.name}" already has method "${name}", please use "super" strategy`);
    }
  }
};

function register(derivedCtor: Derived, baseCtor: Trait) {
  Object.getOwnPropertyNames(baseCtor.prototype).forEach(assignMethodNoOverride(derivedCtor, baseCtor));
  baseCtor.$$name = baseCtor.$$name || counterByName.generate(baseCtor.name);
  (derivedCtor.$is || (derivedCtor.$is = {}))[baseCtor.$$name] = true;
  baseCtor.hasInstance = hasInstance.bind(baseCtor);
}

export function applyMixins(derivedCtor: any, baseCtors: Trait[]) {
  baseCtors.forEach(baseCtor => {
    register(derivedCtor, baseCtor);
  });
}
