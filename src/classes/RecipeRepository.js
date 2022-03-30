export class RecipeRepository {
  constructor() {
    this.recipes = [];
  }

  addRecipe(recipe) { //takes in recipe object
    this.recipes.push(recipe);
  }

  filterByTag(tag) {
    // return a filtered set of recipes based off tag
  }

  filterByName() {
    const justNames = this.recipes.map((recipe) => {
      return recipe.name;
    });
    return justNames;
  }
}
