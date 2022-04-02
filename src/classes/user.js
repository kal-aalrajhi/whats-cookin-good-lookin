export class User {
  constructor() {
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  }
  addFavoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe)
  }

  addRecipesToCook(recipe) {
    this.recipesToCook.push(recipe)
  }
}
