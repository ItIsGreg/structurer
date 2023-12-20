import { caseInsensitiveFindIter } from "@/utils/annotator_utils"; // adjust the import path as necessary

describe("caseInsensitiveFindIter", () => {
  it("finds all case-insensitive occurrences of a substring", () => {
    const text = "Hello world, hello Universe.";
    const substring = "hello";
    const iterator = caseInsensitiveFindIter(substring, text);

    const results = Array.from(iterator);
    expect(results).toHaveLength(2);
    expect(results[0][0]).toBe("Hello");
    expect(results[1][0]).toBe("hello");
  });

  it("returns an empty iterator when no occurrences are found", () => {
    const text = "Hello world, hello Universe.";
    const substring = "notfound";
    const iterator = caseInsensitiveFindIter(substring, text);

    const results = Array.from(iterator);
    expect(results).toHaveLength(0);
  });

  // You can add more test cases to cover different scenarios,
  // such as testing with an empty string, special characters, etc.
});
