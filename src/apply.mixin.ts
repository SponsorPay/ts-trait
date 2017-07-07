import {CounterByName} from "./util/counter.by.name";
import {Trait, TraitStatic} from "./trait";
const counterByName = new CounterByName();

export type Derived = Function & {
  $is?: { [name: string]: boolean };
}

export function hasInstance(instance: any) {
  const base: TraitStatic = this;
  const derived: Derived = instance && instance.constructor;
  return derived && derived.$is && derived.$is[base.$name];
}

const assignMethodNoOverride = (derivedCtor: any, baseCtor: TraitStatic) => (name: string) => {
  if (name !== 'constructor') {
    if (!derivedCtor.prototype[name]) {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    }
  }
};

function register(derivedCtor: Derived, baseCtor: TraitStatic) {
  Object.getOwnPropertyNames(baseCtor.prototype).forEach(assignMethodNoOverride(derivedCtor, baseCtor));
  baseCtor.$name = baseCtor.$name || counterByName.generate(baseCtor.name);
  (derivedCtor.$is || (derivedCtor.$is = {}))[baseCtor.$name] = true;
  baseCtor.hasInstance = hasInstance.bind(baseCtor);
}

export function applyMixins(derivedCtor: any, baseCtors: TraitStatic[]) {
  baseCtors.forEach(baseCtor => {
    register(derivedCtor, baseCtor);
  });
}
