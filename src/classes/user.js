// import { Recipe } from './Recipe';
// import { Ingredient } from './Ingredient';
// import { RecipeRepository } from '../src/classes/RecipeRepository';

export class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.pantry = userData.pantry;
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
