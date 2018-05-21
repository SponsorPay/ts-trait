import {assignPropertyDescriptors} from "./assign"
import {CounterByName} from "./util/counter.by.name";
import {Trait, TraitStatic} from "./trait";

const counterByName = new CounterByName();

export type Derived = Function & {
  $is?: { [name: string]: boolean };
}

export function hasInstance(this: TraitStatic, instance: any) {
  const derived: Derived = instance && instance.constructor;
  return derived != null && derived.$is != null && Boolean(derived.$is[this.$name]);
}

function register(derivedCtor: Derived, baseCtor: TraitStatic) {
  const from = baseCtor.prototype
  const to = derivedCtor.prototype
  assignPropertyDescriptors(to, from)
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
