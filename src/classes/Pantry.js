import { Ingredient } from './Ingredient';
import { User } from './User.js';


export class Pantry {
    constructor(pantry) {
        this.ingredients = pantry || [];

    };

    addIngredient(ingredient) {
        this.ingredients.push(ingredient);

        //check if pantry already includes ingredient
        //if it doesn't exist push it into the this.ingredients array
        //if ingredient is there add it to the amount
        //get ingredients from recipe
        //somehow access quantities
    }

    removeIngredients() {
        // remove ingredients based off passed in recipe.recipeIngredients
        //access amount property in user sample data
        // access amount property is recipe sample data
    }

    canUserCookRecipe() {

    };
    getMissingIngredients() {

    };
}

