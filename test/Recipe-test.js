import { expect } from 'chai';
import { Recipe } from '../src/classes/Recipe';
import { recipesSampleData } from '../src/data/recipes-sample-data';
import { ingredientsData } from '../src/data/ingredients';
    
describe('Recipe', () => {
    let allIngredientsData;
    let recipe;
    let recipeData;
    beforeEach(() => {
        allIngredientsData = ingredientsData;
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

    it.only('should get ingredient names', () => {
        //  recipe.getIngredientDetails(allIngredientsData);
        // recipe.getIngredientNames(allIngredientsData);
        recipe.getTotalCost(allIngredientsData);
    });
});