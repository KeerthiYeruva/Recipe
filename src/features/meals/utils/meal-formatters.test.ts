import { describe, expect, it } from "vitest";

import {
  formatInstructionsAsHtml,
  getSharedIngredientCount,
  parseIngredients,
} from "./meal-formatters";

describe("meal formatters", () => {
  it("parses ingredient JSON arrays", () => {
    expect(parseIngredients(JSON.stringify(["Oats", "Banana"]))).toEqual([
      "Oats",
      "Banana",
    ]);
  });

  it("returns an empty array for invalid ingredients", () => {
    expect(parseIngredients("not-json")).toEqual([]);
    expect(parseIngredients(JSON.stringify({ ingredient: "Oats" }))).toEqual([]);
  });

  it("formats instruction line breaks as HTML breaks", () => {
    expect(formatInstructionsAsHtml("Step one\nStep two")).toBe("Step one<br/>Step two");
  });

  it("counts shared ingredients case-insensitively", () => {
    const firstIngredients = JSON.stringify(["Oats", "Banana", "Milk"]);
    const secondIngredients = JSON.stringify(["banana", "Honey", "milk"]);

    expect(getSharedIngredientCount(firstIngredients, secondIngredients)).toBe(2);
  });
});
