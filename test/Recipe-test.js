import { expect } from 'chai';
import { Recipe } from '../src/classes/Recipe';
import { recipesSampleData } from '../src/data/recipes-sample-data';
import { ingredientsData } from '../src/data/ingredients';
    
describe('Recipe', () => {
    let recipe;
    let recipeData;
    let ingredientDictionary;

    beforeEach(() => {
        recipeData = recipesSampleData[0];
        recipe = new Recipe(recipeData);
        ingredientDictionary = ingredientsData;
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
        expect(recipe.ingredients).to.deep.equal(
            [
                {
                    "id": 20081,
                    "quantity": {
                    "amount": 1.5,
                    "unit": "c"
                    }
                },
                {
                    "id": 18372,
                    "quantity": {
                    "amount": 0.5,
                    "unit": "tsp"
                    }
                },
                {
                    "id": 1123,
                    "quantity": {
                    "amount": 1,
                    "unit": "large"
                    }
                },
                {
                    "id": 19335,
                    "quantity": {
                    "amount": 0.5,
                    "unit": "c"
                    }
                },
                {
                    "id": 19206,
                    "quantity": {
                    "amount": 3,
                    "unit": "Tbsp"
                    }
                },
                {
                    "id": 19334,
                    "quantity": {
                    "amount": 0.5,
                    "unit": "c"
                    }
                },
                {
                    "id": 2047,
                    "quantity": {
                    "amount": 0.5,
                    "unit": "tsp"
                    }
                },
                {
                    "id": 1012047,
                    "quantity": {
                    "amount": 24,
                    "unit": "servings"
                    }
                },
                {
                    "id": 10019903,
                    "quantity": {
                    "amount": 2,
                    "unit": "c"
                    }
                },
                {
                    "id": 1145,
                    "quantity": {
                    "amount": 0.5,
                    "unit": "c"
                    }
                },
                {
                    "id": 2050,
                    "quantity": {
                    "amount": 0.5,
                    "unit": "tsp"
                    }
                }
                ]
        );
    });

    it.only('should get ingredient names', () => {
        recipe.getIngredientNames(ingredientDictionary);
        // expect(recipe.getIngredientNames()).to.equal('https://spoonacular.com/recipeImages/595736-556x370.jpg');
    });

});