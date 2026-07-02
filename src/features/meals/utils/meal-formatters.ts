export function parseIngredients(ingredients: string): string[] {
  if (!ingredients) {
    return [];
  }

  try {
    const parsedIngredients = JSON.parse(ingredients);
    return Array.isArray(parsedIngredients) ? parsedIngredients : [];
  } catch {
    return [];
  }
}

export function formatInstructionsAsHtml(instructions: string): string {
  return instructions.replace(/\n/g, "<br/>");
}
