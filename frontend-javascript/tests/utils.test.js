const { getFirstName, getLength } = require("../utils/utils");

test("should return length of the given array", () => {
  const arrLength = getLength([99, 98, 97, 95]);

  expect(arrLength).toEqual(4);
});

test("should return first name of the given username", () => {
  const result = getFirstName("Monica Geller");
  expect(result).toEqual("Monica");
});
