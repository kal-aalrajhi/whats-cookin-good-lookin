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
    // const
    // return a filtered set of recipes based off name
  }
}
