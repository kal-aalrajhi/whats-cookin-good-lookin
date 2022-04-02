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

//need to filter favoriteRecipes by tag
//need to filter favoriteRecipes by name
//should recipes to cook be its own page/view?

}
