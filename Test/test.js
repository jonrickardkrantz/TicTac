import { cellElements } from "../array";

describe(cellElements, function () {
  it("is an array", function () {
    assert.typeOf(cellElements, "array");
  });

  it("is not empty at start", function () {
    assert.isNotEmpty(todos);
  });
});
