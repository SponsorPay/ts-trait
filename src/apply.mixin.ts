export type Constructor = new(...args: any[]) => any;

export type Trait = Function & {
  new(...args: any[]): any;
  isInstanceOf?(instance: any): boolean;
  $$derived?: {[name: string]: Constructor[]};
}

const CONSTRUCTOR = 'constructor';

function getDerivedArray(baseCtor: Trait, name: string) {
  const $$derived = (baseCtor.$$derived || (baseCtor.$$derived = {}));
  return ($$derived[name] || ($$derived[name] = []))
}

export function isInstanceOf(instance: any) {
  const _this: Trait = this;
  return _this.$$derived[instance.constructor.name].some(ctor => instance instanceof ctor);
}

const assignMethodNoOverride = (derivedCtor: any, baseCtor: Trait) => (name: string) => {
  if (name !== CONSTRUCTOR) {
    if (!derivedCtor.prototype[name]) {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    } else {
      console.warn(`Derived class "${derivedCtor.name}" already has method "${name}", please use "super" strategy`);
    }
  }
};

function register(derivedCtor: any, baseCtor: Trait) {
  console.log(`register ${derivedCtor.name} in ${baseCtor.name}`);
  Object.getOwnPropertyNames(baseCtor.prototype).forEach(assignMethodNoOverride(derivedCtor, baseCtor));
  getDerivedArray(baseCtor, derivedCtor.name).push(derivedCtor);
  baseCtor.isInstanceOf = isInstanceOf.bind(baseCtor);
}

export function applyMixins(derivedCtor: any, baseCtors: Trait[]) {
  baseCtors.forEach(baseCtor => {
    register(derivedCtor, baseCtor);
  });
}

