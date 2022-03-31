export class RecipeRepository {
  constructor() {
    this.recipes = [];
  }

  addRecipe(recipe) {
    this.recipes.push(recipe);
  }

  filterByTag(tagToFilter) {
    const recipesWithTag = this.recipes.reduce((acc, recipe) => {
      let recipeWithSameTag = recipe.tags.find((tag) => tag === tagToFilter);
      if (recipeWithSameTag !== undefined) {
        acc.push(recipe);
      }
      return acc;
    }, []);
    console.log(recipesWithTag);
    return recipesWithTag;
  }

  filterByName() {
    const justNames = this.recipes.map((recipe) => {
      return recipe.name;
    });
    return justNames;
  }
}
