import {
  caseInsensitiveFindIter,
  caseInsensitiveFindIterNoNewline,
} from "@/utils/annotator_utils"; // adjust the import path as necessary

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

  it("works, even when there are newline characters in the substring", () => {
    const text =
      "She had calcification in her breast, which was removed  \npreviously and per patient not, it was benign.";
    const substring = "which was removed  \npreviously";
    const iterator = caseInsensitiveFindIter(substring, text);

    const results = Array.from(iterator);
    expect(results).toHaveLength(1);
  });

  it("fails, when the newline character is absent in the substring", () => {
    const text =
      "She had calcification in her breast, which was removed  \npreviously and per patient not, it was benign.";
    const substring = "which was removed  previously";
    const iterator = caseInsensitiveFindIter(substring, text);

    const results = Array.from(iterator);
    expect(results).toHaveLength(0);
  });
});

describe("caseInsensitiveFindIterNoNewline", () => {
  it("finds all case-insensitive occurrences of a substring", () => {
    const text = "Hello world, hello Universe.";
    const substring = "hello";
    const iterator = caseInsensitiveFindIterNoNewline(substring, text);

    const results = Array.from(iterator);
    expect(results).toHaveLength(2);
    expect(results[0][0]).toBe("Hello");
    expect(results[1][0]).toBe("hello");
  });

  it("returns an empty iterator when no occurrences are found", () => {
    const text = "Hello world, hello Universe.";
    const substring = "notfound";
    const iterator = caseInsensitiveFindIterNoNewline(substring, text);

    const results = Array.from(iterator);
    expect(results).toHaveLength(0);
  });

  it("fails, when there is a newline character in the substring", () => {
    const text =
      "She had calcification in her breast, which was removed  \npreviously and per patient not, it was benign.";
    const substring = "which was removed  \npreviously";
    const iterator = caseInsensitiveFindIterNoNewline(substring, text);

    const results = Array.from(iterator);
    expect(results).toHaveLength(0);
  });

  it("works when the newline character in the subststring is replaced with a space", () => {
    const text =
      "She had calcification in her breast, which was removed  \npreviously and per patient not, it was benign.";
    const substring = "which was removed   previously";
    const iterator = caseInsensitiveFindIterNoNewline(substring, text);

    const results = Array.from(iterator);
    expect(results).toHaveLength(1);
  });
});
