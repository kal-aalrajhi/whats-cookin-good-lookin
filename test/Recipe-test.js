import { expect } from 'chai';
import { Recipe } from '../src/classes/Recipe';
import { recipesSampleData } from '../src/data/recipes-sample-data';
    
describe('Recipe', () => {
    let recipe;
    let recipeData;
    beforeEach(() => {
        recipeData = recipesSampleData[0];
        recipe = new Recipe(recipeData);
    });

    it('should create a new instance of Recipe', () => {
        expect(recipe).to.be.an.instanceof(Recipe);
    });
});