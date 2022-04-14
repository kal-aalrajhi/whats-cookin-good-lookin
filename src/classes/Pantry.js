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
        let foundIngredient = this.ingredients.find((ingredient) => {
            return pantryIngredient.ingredient === ingredient.ingredient;
        });
        
        if(!foundIngredient) {
            this.ingredients.push(pantryIngredient);
        } else {
             this.ingredients.forEach((ingredient) => {
                if(ingredient.ingredient === pantryIngredient.ingredient) {
                    ingredient.amount += pantryIngredient.amount;
                }
            });
        }
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

