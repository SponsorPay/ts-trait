export interface TraitStatic {
  new(...args: any[]): any;
  hasInstance: (instance: any) => boolean;
  $name: string;
}

export class Trait {
  static hasInstance: (instance: any) => boolean;
  static $name: string;
}
