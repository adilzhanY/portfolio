import { test } from "node:test";
import assert from "node:assert/strict";
import { isTranslated, localePath, splitLocale } from "./config.ts";

test("localePath prefixes every locale but English", () => {
  assert.equal(localePath("en", "/"), "/");
  assert.equal(localePath("en", "/projects"), "/projects");
  assert.equal(localePath("ru", "/"), "/ru");
  assert.equal(localePath("ru", "/projects/torq"), "/ru/projects/torq");
});

test("splitLocale separates the prefix from the path", () => {
  assert.deepEqual(splitLocale("/"), { locale: "en", path: "/" });
  assert.deepEqual(splitLocale("/ru"), { locale: "ru", path: "/" });
  assert.deepEqual(splitLocale("/ru/"), { locale: "ru", path: "/" });
  assert.deepEqual(splitLocale("/de/projects/torq"), {
    locale: "de",
    path: "/projects/torq",
  });
  assert.deepEqual(splitLocale("/projects"), {
    locale: "en",
    path: "/projects",
  });
  assert.deepEqual(splitLocale("/projects/"), {
    locale: "en",
    path: "/projects",
  });
});

test("isTranslated leaves out the blog and nothing else", () => {
  assert.equal(isTranslated("/blog"), false);
  assert.equal(isTranslated("/blog/x"), false);
  assert.equal(isTranslated("/blogger"), true);
  assert.equal(isTranslated("/projects"), true);
});
