import {assignPropertyDescriptors} from "./assign"

export function extension(classes: any[]) {
  return function (withClass: any) {
    for (const cls of classes) {
      assignPropertyDescriptors(cls.prototype, withClass.prototype)
    }
  }
}
