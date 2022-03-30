import { Ingredient } from './Ingredient';

export class Recipe {
    constructor(recipe) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.recipeIngredients = recipe.ingredients; 
        this.instructions = recipe.instructions;
        this.name = recipe.name;
        this.tags = recipe.tags;
    }

    getIngredientDetails(ingredientsData) {
        let ingredientDetails = this.recipeIngredients.map((recipeIngredient) => {
                let idMatch = ingredientsData.find(ingredientData => recipeIngredient.id === ingredientData.id);
                let currentIngredient = new Ingredient(idMatch);
                return currentIngredient;
            });
            return ingredientDetails;
    }

    getIngredientNames(ingredientsData) {
        let ingredientDetails = this.getIngredientDetails(ingredientsData);
        let ingredientNames = ingredientDetails.map(ingredientDetail => ingredientDetail.name);
        return ingredientNames;
    }
    
    getTotalCost(ingredientsData) {
        let ingredientDetails =  this.getIngredientDetails(ingredientsData);
        let totalCostInCents = ingredientDetails.reduce((total, ingredientDetail, idx) => {
        return total + (ingredientDetail.estimatedCostInCents * this.recipeIngredients[idx].quantity.amount);
        }, 0);
        console.log(totalCostInCents);
        var totalCostInDollars = (totalCostInCents / 100).toFixed(2); // conver to dollars
        return totalCostInDollars;
    }
    
    getInstructions() {
        return this.instructions;
    }
};












//     import { Ingredient } from './Ingredient';

// export class Recipe {
//     constructor(recipe) {
//         this.id = recipe.id;
//         this.image = recipe.image;
//         this.ingredients = recipe.ingredients; 
//         this.instructions = recipe.instructions;
//         this.name = recipe.name;
//         this.tags = recipe.tags;
//     }

//     // getIngredientDetails(ingredientsDictionary) {
//     //     let ingredientDetails = this.ingredients.map((ingredientFromRecipe) => {
//     //             let idMatch = ingredientsDictionary.find(ingredientFromDictionary => ingredientFromDictionary.id === ingredientFromRecipe.id)
//     //             let currentIngredient = new Ingredient(idMatch);
//     //             return currentIngredient;
//     //         });
//     //         return ingredientDetails;
//     // }

//     getIngredientNames(ingredientsDictionary) {
//         let ingredientNames = this.ingredients.map((ingredientFromRecipe) => {
//                 let idMatch = ingredientsDictionary.find(ingredientFromDictionary => ingredientFromDictionary.id === ingredientFromRecipe.id)
//                 let currentIngredient = new Ingredient(idMatch);
//                 return currentIngredient.name;
//             });
//             console.log(ingredientNames);
//     }
    
//     getTotalCost(ingredientsDictionary) {// takes in an array of ingredients
//         let ingredientPricesInCents = this.ingredients.map((ingredientFromRecipe) => {
//             let idMatch = ingredientsDictionary.find(ingredientFromDictionary => ingredientFromDictionary.id === ingredientFromRecipe.id)
//             let currentIngredient = new Ingredient(idMatch);
//             return currentIngredient.estimatedCostInCents * ingredientFromRecipe.quantity.amount;
//         });
//         console.log(ingredientPricesInCents);

//         let totalCostInCents = ingredientPricesInCents.reduce((acc, price) => {
//             return acc + price;
//         }, 0);

//         var totalCostInDollars = (totalCostInCents / 100).toFixed(2); // conver to dollars

//         console.log(totalCostInCents);
//         console.log(totalCostInDollars);

//     }
    
//     getInstructions() {
//         return this.instructions;
//     }
//     };