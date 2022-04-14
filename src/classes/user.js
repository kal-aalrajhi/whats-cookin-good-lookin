import { Pantry } from './Pantry.js';

export class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.pantry = new Pantry(userData.pantry);
    // this.pantry = userData.pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
  };

  addFavoriteRecipe(recipe) {
    this.favoriteRecipes.push(recipe);
  };

  addRecipesToCook(recipe) {
    this.recipesToCook.push(recipe);
  };
};

