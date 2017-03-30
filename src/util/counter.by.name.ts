export class CounterByName {
  counters: {[name: string]: number} = {};

  generate(name: string) {
    const {counters} = this;
    return `${name}_${(counters[name] && counters[name]++ || (counters[name] = 1))}`;
  }
}
