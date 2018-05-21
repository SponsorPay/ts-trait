import {extension} from "../src/extension"
import {should} from "chai"
should()

@extension([Array])
export abstract class ArrayExtension<T> {
  get isNotEmpty() {
    return !this.isEmpty
  }

  get isEmpty(this: Array<T>) {
    return !this.length
  }
}

declare global {
  interface Array<T> extends ArrayExtension<T> {

  }
}

describe("array.extension", function () {
  it("should extension decorator", () => {
    const x: number[] = [1]
    x.isEmpty.should.eq(false)
  })
})
