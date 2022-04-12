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

    it('recipe is to cook', () => {
        recipe.toCook = true;
        expect(recipe.toCook).to.equal(true);
    });

    it('should be able to get ingredients details', () => {
        console.log('INVOKE', recipe.getIngredientDetails(allIngredientsData))
        expect(recipe.getIngredientDetails(allIngredientsData)).to.deep.equal([
             {
              id: 20081,
              name: 'wheat flour',
              estimatedCostInCents: 142
            },
             {
              id: 18372,
              name: 'bicarbonate of soda',
              estimatedCostInCents: 582
            },
             { id: 1123, name: 'eggs', estimatedCostInCents: 472 },
             { id: 19335, name: 'sucrose', estimatedCostInCents: 902 },
             {
              id: 19206,
              name: 'instant vanilla pudding',
              estimatedCostInCents: 660
            }
          ]
          )
    });

    // it('should be able to get ingredients names', () => {
    //     // expect(recipe.getIngredientNames()).to.equal(ingredientNames);
    // });

    it('should get total cost in dollars', () => {
        expect(recipe.getTotalCostInDollars(allIngredientsData)).to.equal('34.07'); 
    });

    it('should get ingredient instructions', () => {
        expect(recipe.getInstructions()).to.equal(recipe.instructions);
    });
});