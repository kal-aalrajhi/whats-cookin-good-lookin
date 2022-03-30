import { Ingredient } from './Ingredient';

export class Recipe {
    constructor(recipe) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.ingredients = recipe.ingredients; 
    }

    // getIngredientDetails(ingredientsDictionary) {
    //     let ingredientDetails = this.ingredients.map((ingredientFromRecipe) => {
    //             let idMatch = ingredientsDictionary.find(ingredientFromDictionary => ingredientFromDictionary.id === ingredientFromRecipe.id)
    //             let currentIngredient = new Ingredient(idMatch);
    //             return currentIngredient;
    //         });
    //         return ingredientDetails;
    // }

    getIngredientNames(ingredientsDictionary) {
        let ingredientNames = this.ingredients.map((ingredientFromRecipe) => {
                let idMatch = ingredientsDictionary.find(ingredientItem => ingredientItem.id === ingredientFromRecipe.id)
                let currentIngredient = new Ingredient(idMatch);
                return currentIngredient.name;
            });
            console.log(ingredientNames);
    }
        
    calculateCost(ingredient) { // takes in a single ingredient
        // calculate the cost of the ingredient by cost in cents * quantity
    }
    
    getTotalCost(ingredients) {// takes in an array of ingredients
        // runs through the array of ingredients summing up the total cost.
        // invokes `calculcateCost()`
    }
    
    // getInstructions() {
    //     // returns ingredient instructions object
    // }
    };