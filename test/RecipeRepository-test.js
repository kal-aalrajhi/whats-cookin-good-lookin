import { expect } from 'chai';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('Recipe', () => {
    let recipeRepository;

  beforeEach(() => {
    recipeRepository = new RecipeRepository();
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });
})
