export function assignPropertyDescriptors<T, S>(target: T, source: S, override = false) {
  for (const name of Object.getOwnPropertyNames(source)) {
    if (name !== 'constructor') {
      const descriptor = Object.getOwnPropertyDescriptor(source, name)
      if (descriptor != null && (override || !target.hasOwnProperty(name))) {
        Object.defineProperty(target, name, descriptor)
      }
    }
  }
}
