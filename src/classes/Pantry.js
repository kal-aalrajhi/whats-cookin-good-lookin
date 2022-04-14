import { Ingredient } from './Ingredient';
import { User } from './User.js';


export class Pantry {
    constructor(pantry) {
        this.ingredients = pantry|| [];

    };

    addIngredient(ingredientData, amount) {
        let pantryIngredient = {
            ingredient: ingredientData.id,
            amount: amount
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

