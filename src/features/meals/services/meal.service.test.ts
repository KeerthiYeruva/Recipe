import fs from "node:fs/promises";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createMeal } from "../repositories/meal.repository";
import { saveMeal } from "./meal.service";

vi.mock("node:fs/promises", () => ({
  default: {
    mkdir: vi.fn(),
    writeFile: vi.fn(),
  },
}));

vi.mock("../repositories/meal.repository", () => ({
  createMeal: vi.fn(),
}));

describe("saveMeal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sanitizes instructions, saves the image, and creates the meal", async () => {
    const image = new File(["image-bytes"], "cake.jpg", { type: "image/jpeg" });

    await saveMeal({
      title: "Chocolate Cake",
      summary: "Quick dessert",
      instructions: "<script>alert('xss')</script>Mix well",
      ingredients: JSON.stringify(["1 cup flour", "2 tbsp cocoa"]),
      image,
      category: "Dessert",
      prep_time: 12,
      servings: 2,
      difficulty: "Easy",
      calories: 420,
      creator: "Keerthi",
      creator_email: "keerthi@example.com",
    });

    expect(fs.mkdir).toHaveBeenCalledWith(expect.stringContaining("public"), {
      recursive: true,
    });
    expect(fs.writeFile).toHaveBeenCalledWith(
      expect.stringContaining("chocolate-cake.jpg"),
      expect.any(Buffer)
    );
    expect(createMeal).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Chocolate Cake",
        image: "/images/chocolate-cake.jpg",
        category: "Dessert",
      })
    );
    expect(vi.mocked(createMeal).mock.calls[0][0].instructions).not.toContain("<script>");
  });
});
