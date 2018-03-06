import {CounterByName} from "./util/counter.by.name";
import {Trait, TraitStatic} from "./trait";

const counterByName = new CounterByName();

export type Derived = Function & {
  $is?: { [name: string]: boolean };
}

export function hasInstance(instance: any) {
  const base: TraitStatic = this;
  const derived: Derived = instance && instance.constructor;
  return derived != null && derived.$is != null && Boolean(derived.$is[base.$name]);
}

function register(derivedCtor: Derived, baseCtor: TraitStatic) {
  const from = baseCtor.prototype
  const to = derivedCtor.prototype
  for (const name of Object.getOwnPropertyNames(from)) {
    if (name !== 'constructor') {
      const descriptor = Object.getOwnPropertyDescriptor(from, name)
      if (descriptor != null && !to.hasOwnProperty(name)) {
        Object.defineProperty(to, name, descriptor)
      }
    }
  }
  baseCtor.$name = baseCtor.$name || counterByName.generate(baseCtor.name);
  (derivedCtor.$is || (derivedCtor.$is = {}))[baseCtor.$name] = true;
  baseCtor.hasInstance = hasInstance.bind(baseCtor);
}

export function applyMixins(baseCtors: any[]) {
  return (derivedCtor: any) => {
    for (const baseCtor of baseCtors) {
      register(derivedCtor, baseCtor)
    }
  }
}
