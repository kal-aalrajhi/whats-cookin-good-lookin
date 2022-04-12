import { expect } from 'chai';
import { Recipe } from '../src/classes/Recipe';
import { recipesSampleData } from '../src/data/recipes-sample-data';
import { ingredientsSampleData } from '../src/data/ingredients-sample-data';
    
describe('Recipe', () => {
    let allIngredientsData;
    let recipe;
    let recipeData;
    beforeEach(() => {
        allIngredientsData = ingredientsSampleData;
        recipeData = recipesSampleData[0];
        recipe = new Recipe(recipeData);
    });

    it('should create a new instance of Recipe', () => {
        expect(recipe).to.be.an.instanceof(Recipe);
    });

    it('should have an id', () => {
        expect(recipe.id).to.equal(595736);
    });

    it('should have an image', () => {
        expect(recipe.image).to.equal('https://spoonacular.com/recipeImages/595736-556x370.jpg');
    });

    it('should have ingredients', () => {
        expect(recipe.recipeIngredients).to.equal(recipeData.ingredients); 
    });

    it('should get instructions', () => {
        expect(recipe.instructions).to.equal(recipeData.instructions);
    });

    it('should get name', () => {
        expect(recipe.name).to.equal(recipeData.name);
    });

    it('should get tags', () => {
        expect(recipe.tags).to.equal(recipeData.tags);
    });

    it('should be unfavorited by default', () => {
        expect(recipe.favorite).to.equal(false);
    });

    it('can be favorited', () => {
        recipe.favorite = true;
        expect(recipe.favorite).to.equal(true);
    });

    it('recipe is not to cook by default', () => {
        expect(recipe.toCook).to.equal(false);
    });

    it('should be able to get ingredients details', () => {
        expect(recipe.recipeIngredients).to.deep.equal([
            { id: 20081, quantity: { amount: 1.5, unit: 'c' } },
            { id: 18372, quantity: { amount: 0.5, unit: 'tsp' } },
            { id: 1123, quantity: { amount: 1, unit: 'large' } },
            { id: 19335, quantity: { amount: 0.5, unit: 'c' } },
            { id: 19206, quantity: { amount: 3, unit: 'Tbsp' } }
          ])
    });

    it('recipe is to cook', () => {
        recipe.toCook = true;
        expect(recipe.toCook).to.equal(true);
    });

    it('should get total cost in dollars', () => {
        expect(recipe.getTotalCostInDollars(allIngredientsData)).to.equal('34.07'); 
    });

    it('should get ingredient instructions', () => {
        expect(recipe.getInstructions()).to.equal(recipe.instructions);
    });
});