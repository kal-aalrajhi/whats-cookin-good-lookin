import { expect } from 'chai';
import { RecipeRepository } from '../src/classes/RecipeRepository';
import { Recipe } from '../src/classes/Recipe';
import { recipesSampleData } from '../src/data/recipes-sample-data';

describe('Recipe Repository', () => {
    let recipeRepository;
    let recipe1, recipe2, recipe3;
    let recipeObj1, recipeObj2, recipeObj3;
    let recipeData;

  beforeEach(() => {
    recipeData = recipesSampleData;
    recipe1 = recipeData[0]; 
    recipe2 = recipeData[1];
    recipe3 = recipeData[2];
    recipeObj1 = new Recipe(recipeData[0]);
    recipeObj2 = new Recipe(recipeData[1]);
    recipeObj3 = new Recipe(recipeData[2]);
    recipeRepository = new RecipeRepository();
  });

  it('should create a new instance of RecipeRepository', () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('should start without a recipe', () => {
    expect(recipeRepository.recipes).to.deep.equal([]);
  });

  it('can take a collection of recipes', () => {
    recipeRepository.addRecipes(recipeData);
    expect(recipeRepository.recipes).to.deep.equal([recipeObj1, recipeObj2, recipeObj3]);
  });

  it('can add a single recipe', () => {
    recipeRepository.addRecipes(recipe1);
    expect(recipeRepository.recipes[0]).to.deep.equal(recipeObj1);
  });

  it('can add multiple recipes', () => {
    recipeRepository.addRecipes(recipe1);
    recipeRepository.addRecipes(recipe2);
    recipeRepository.addRecipes(recipe3);
    expect(recipeRepository.recipes[0]).to.deep.equal(recipeObj1);
    expect(recipeRepository.recipes[1]).to.deep.equal(recipeObj2);
    expect(recipeRepository.recipes[2]).to.deep.equal(recipeObj3);
  });

  it('should filter recipe by name', () => {
    recipeRepository.addRecipes(recipe1);
    recipeRepository.addRecipes(recipe2);
    recipeRepository.addRecipes(recipe3);
    expect(recipeRepository.filterByName()).to.deep.equal(['Loaded Chocolate Chip Pudding Cookie Cups', 'Maple Dijon Apple Cider Grilled Pork Chops', 'Dirty Steve\'s Original Wing Sauce']);
  });

  it('should filter recipe by tag', () => {
    recipeRepository.addRecipes(recipe1);
    recipeRepository.addRecipes(recipe2);
    recipeRepository.addRecipes(recipe3);
    expect(recipeRepository.filterByTag('snack')).to.deep.equal([recipeObj1]);
  });

  it('should filter recipe by id', () => {
    recipeRepository.addRecipes(recipe1);
    recipeRepository.addRecipes(recipe2);
    recipeRepository.addRecipes(recipe3);
    expect(recipeRepository.filterById(595736)).to.equal(recipeRepository.recipes[0]);
  });
});
