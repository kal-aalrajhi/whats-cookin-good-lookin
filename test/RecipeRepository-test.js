import { expect } from 'chai';
import { RecipeRepository } from '../src/classes/RecipeRepository';
import { Recipe } from '../src/classes/Recipe';
import { recipesSampleData } from '../src/data/recipes-sample-data';

describe('Recipe Repository', () => {
    let recipeRepository;
    let recipe1, recipe2, recipe3
    let recipeData;

  beforeEach(() => {
    recipeData = recipesSampleData;
    recipe1 = new Recipe(recipeData[0]);
    recipe2 = new Recipe(recipeData[1]);
    recipe3 = new Recipe(recipeData[2]);
    recipeRepository = new RecipeRepository();

  });

  it('should create a new instance of RecipeRepository', () => {
    expect(recipeRepository).to.be.an.instanceof(RecipeRepository);
  });

  it('should start without a recipe', () => {
    expect(recipeRepository.recipes).to.deep.equal([]);
  });

  it('should add a single recipe', () => {
    recipeRepository.addRecipes(recipe1);
    expect(recipeRepository.recipes[0]).to.deep.equal(recipe1);
  });

  it('should add multiple recipes', () => {
    recipeRepository.addRecipes(recipe1);
    recipeRepository.addRecipes(recipe2);
    recipeRepository.addRecipes(recipe3);
    expect(recipeRepository.recipes[0]).to.deep.equal(recipe1);
    expect(recipeRepository.recipes[1]).to.deep.equal(recipe2);
    expect(recipeRepository.recipes[2]).to.deep.equal(recipe3);
  });

  it('should add an array of recipes', () => {
    recipeRepository.addRecipes(recipeData);
    expect(recipeRepository.recipes).to.deep.equal(recipeData);
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
    expect(recipeRepository.filterByTag('snack')).to.deep.equal([recipe1]);
  })
});
