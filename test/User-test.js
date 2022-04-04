import { expect } from 'chai';
import { Recipe } from '../src/classes/Recipe';
import { recipesSampleData } from '../src/data/recipes-sample-data';
import { User } from '../src/classes/User.js';
import { usersSampleData } from '../src/data/users-sample-data.js';

describe('User', () => {
  let user;
  let userData;
  let recipeData;
  let recipe1, recipe2, recipe3;

  beforeEach(() => {
    userData = usersSampleData;
    recipeData = recipesSampleData;
    user = new User(userData[0]);
    recipe1 = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
    recipe3 = new Recipe(recipeData[2]);
  });

  it('should create a new instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have a name', () => {
    expect(user.name).to.equal('Saige O\'Kon');
  });

  it('should have an id', () => {
    expect(user.id).to.equal(1);
  });

  it('should have a pantry with ingredients and amounts', () => {
    expect(user.pantry).to.deep.equal(userData[0].pantry);
  });

  it('should start with no favorite recipes', () => {
    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  it('should add a favorite recipe', () => {
    user.addFavoriteRecipe(recipe1);
    expect(user.favoriteRecipes).to.deep.equal([recipe1]);
  });

  it('should add multiple favorite recipes', () => {
    user.addFavoriteRecipe(recipe1);
    user.addFavoriteRecipe(recipe2);
    user.addFavoriteRecipe(recipe3);
    expect(user.favoriteRecipes).to.deep.equal([recipe1, recipe2, recipe3]);
  });

  it('should start with no recipes to cook', () => {
    expect(user.recipesToCook).to.deep.equal([]);
  });

  it('should add a recipe to cook', () => {
    user.addRecipesToCook(recipe1);
    expect(user.recipesToCook).to.deep.equal([recipe1]);
  });

  it('should add multiple recipes to cook', () => {
    user.addRecipesToCook(recipe1);
    user.addRecipesToCook(recipe2);
    user.addRecipesToCook(recipe3);
    expect(user.recipesToCook).to.deep.equal([recipe1, recipe2, recipe3]);
  });
});
