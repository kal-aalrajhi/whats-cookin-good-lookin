import { Ingredient } from './Ingredient';

export class Pantry {
    constructor(pantry) { // Remember that Pantry is only accessed via the User
        this.ingredientsInPantry = pantry || [];
    };

    // Test me
    addIngredient(ingredientData, amount) {
        let pantryIngredient = {
            ingredient: ingredientData.id,
            amount: amount
        }
        let foundIngredient = this.ingredientsInPantry.find((ingredient) => {
            return pantryIngredient.ingredient === ingredient.ingredient;
        });
        
        if(!foundIngredient) {
            this.ingredientsInPantry.push(pantryIngredient);
            return `Successfully added ${pantryIngredient.amount} ${ingredientData.name} to your pantry.`;
        } else {
             this.ingredientsInPantry.forEach((ingredient) => {
                if(ingredient.ingredient === pantryIngredient.ingredient) {
                    ingredient.amount += pantryIngredient.amount;
                }
            });
            return `Successfully added ${pantryIngredient.amount} more ${ingredientData.name} to your pantry.`;
        }
    }
    
    // Test me
    removeIngredient(ingredientData, amountToRemove) {
        let pantryIngredient = {
            ingredient: ingredientData.id,
            amount: amountToRemove
        }
        let foundIngredient = this.ingredientsInPantry.find((ingredient) => {
            return pantryIngredient.ingredient === ingredient.ingredient;
        });
        // console.log(this.ingredientsInPantry)
        let removalStatusMsg = "";
        // Check if ingredient is in pantry
        if(!foundIngredient) {
            removalStatusMsg = `You do not have any ${ingredientData.name} to remove.`;
        } else {
             this.ingredientsInPantry.forEach((ingredient, idx) => {
                 // Locate the ingredient
                if (ingredient.ingredient === pantryIngredient.ingredient) {
                    // Make sure you can't remove more than you have
                    if (ingredient.amount < amountToRemove) {
                        removalStatusMsg = `Sorry you can't remove ${amountToRemove} ${ingredientData.name} when you only have ${ingredient.amount} ${ingredientData.name}.`;
                    } else { // Substract amount from ingredient
                        ingredient.amount -= amountToRemove;
                        removalStatusMsg = `Successfully removed ${amountToRemove} ${ingredientData.name}.`
                    }

                    // Check if ingredient amount is 0. If so, remove it.
                    if (ingredient.amount === 0) {
                        this.ingredientsInPantry.splice(idx, 1);
                    }
                }
            });
        }
        return removalStatusMsg;
    }

    // Test me
    getIngredientDetails(ingredientsData) { // ingredient dictionary passed in
        let ingredientDetails = this.ingredientsInPantry.map((ingredientInPantry) => {
        let idMatch = ingredientsData.find(ingredientData => ingredientInPantry.ingredient === ingredientData.id);
        let currentIngredient = new Ingredient(idMatch);
        return currentIngredient
        });
        return ingredientDetails; // returns ingredient objects
    }

    // Test me
    getCurrentQuantity(ingredientId) {
        let ingredientToFind = this.ingredientsInPantry.find(pantryIngredient => pantryIngredient.ingredient === ingredientId);
        // if not found, then you have 0 of that ingredient
        if(!ingredientToFind) {
            return 0;
        }
        return ingredientToFind.amount;
    };

    // Test me
    getIngredientIds(ingredientsData) {
        let ingredientDetails = this.getIngredientDetails(ingredientsData);
        let ingredientIds = ingredientDetails.map(ingredientDetail => ingredientDetail.id);
        return ingredientIds; // works with ingredient objects, returns array of IDs ['17783', '123123']
    }

    // Test me
    getIngredientNames(ingredientsData) {
        let ingredientDetails = this.getIngredientDetails(ingredientsData);
        let ingredientNames = ingredientDetails.map(ingredientDetail => ingredientDetail.name);
        return ingredientNames; // works with ingredient objects, returns array of names ['cinnamon', 'blueberry']
    }

    // Test me
    getIngredientAmounts() {
        let ingredientAmounts = this.ingredientsInPantry.map(ingredientInPantry => ingredientInPantry.amount);
        return ingredientAmounts;  // works with ingredient objects, returns array of amount ['18', '7']
    }

    // From INGREDIENTS DATA (ingredientsData)
    // [
    //     { id: 20081, name: 'wheat flour', estimatedCostInCents: 142 },
    //     { id: 18372, name: 'bicarbonate of soda', estimatedCostInCents: 582 },
    //     { id: 1123, name: 'eggs', estimatedCostInCents: 472 },... 
    // ]
      

    // From the RECIPE (recipe.recipeIngredients)
    // recipeIngredients: [ 
    //     { id: 20081, quantity: [Object] },
    //     { id: 18372, quantity: [Object] },
    //     { id: 1123, quantity: [Object] },
    //     { id: 19335, quantity: [Object] },
    //     { id: 19206, quantity: [Object] }
    //   ]

    // quantity (recipe.recipeIngredients[0].quantity)
    //  { amount: 1.5, unit: 'c' }

    // From INGREDIENTS IN PANTRY (this.ingredientsInPantry)
    // [
    //     { ingredient: 11297, amount: 4 },
    //     { ingredient: 1082047, amount: 10 },
    //     { ingredient: 20081, amount: 5 }, ...
    // ]

    // Test me
    compareRecipeToPantry(recipe, ingredientsData) { // takes in a recipe object
        const recipeToPantryIngredients = recipe.recipeIngredients.map((recIngredient) => {
            // Get current ingredient name
            let ingredientName = ingredientsData.find(ingredientData => ingredientData.id === recIngredient.id).name;
            // Get current ingredient from pantry
            let ingredientFromPantry = this.ingredientsInPantry.find(ingredientInPantry => ingredientInPantry.ingredient === recIngredient.id);
            let ingredientFromPantryAmount = 0; // incase ingredient not found, then we have 0 of it
            if (ingredientFromPantry) {
                ingredientFromPantryAmount = ingredientFromPantry.amount;
            } 
            // Get amount needed to make recipe
            let amountNeeded = recIngredient.quantity.amount - ingredientFromPantryAmount; 
            // if negative, then user has more than enough - so they don't need any
            if(amountNeeded < 0) {
                amountNeeded = 0;
            }
            return {
                id: recIngredient.id,
                name: ingredientName,
                amountRequired: recIngredient.quantity.amount,
                amountInPantry: ingredientFromPantryAmount,
                amountNeeded: amountNeeded
            }
        });
        return recipeToPantryIngredients;
    }

    getMissingIngredients(recipe, ingredientsData) {
        let comparedIngredients = this.compareRecipeToPantry(recipe, ingredientsData);
        let missingIngredients = comparedIngredients.filter(ingredient => ingredient.amountNeeded > 0);
        
        return missingIngredients;
    }

    isIngredientMissing(recipe, ingredientsData) {
        return !!this.getMissingIngredients(recipe, ingredientsData);
    }
}





// import { Ingredient } from './Ingredient';

// export class Pantry {
//     constructor(pantry) {
//         this.ingredientsInPantry = pantry|| [];

//     };

//     // Test me
//     addIngredient(ingredientData, amount) {
//         let pantryIngredient = {
//             ingredient: ingredientData.id,
//             amount: amount
//         }
//         let foundIngredient = this.ingredientsInPantry.find((ingredient) => {
//             return pantryIngredient.ingredient === ingredient.ingredient;
//         });
        
//         if(!foundIngredient) {
//             this.ingredientsInPantry.push(pantryIngredient);
//             return `Successfully added ${pantryIngredient.amount} ${ingredientData.name} to your pantry.`;
//         } else {
//              this.ingredientsInPantry.forEach((ingredient) => {
//                 if(ingredient.ingredient === pantryIngredient.ingredient) {
//                     ingredient.amount += pantryIngredient.amount;
//                 }
//             });
//             return `Successfully added ${pantryIngredient.amount} more ${ingredientData.name} to your pantry.`;
//         }
//     }
    
//     // Test me
//     removeIngredient(ingredientData, amountToRemove) {
//         let pantryIngredient = {
//             ingredient: ingredientData.id,
//             amount: amountToRemove
//         }
//         let foundIngredient = this.ingredientsInPantry.find((ingredient) => {
//             return pantryIngredient.ingredient === ingredient.ingredient;
//         });
//         console.log(this.ingredientsInPantry)
//         let removalStatusMsg = "";
//         // Check if ingredient is in pantry
//         if(!foundIngredient) {
//             removalStatusMsg = `You do not have any ${ingredientData.name} to remove.`;
//         } else {
//              this.ingredientsInPantry.forEach((ingredient, idx) => {
//                  // Locate the ingredient
//                 if (ingredient.ingredient === pantryIngredient.ingredient) {
//                     // Make sure you can't remove more than you have
//                     if (ingredient.amount < amountToRemove) {
//                         removalStatusMsg = `Sorry you can't remove ${amountToRemove} ${ingredientData.name} when you only have ${ingredient.amount} ${ingredientData.name}.`;
//                     } else { // Substract amount from ingredient
//                         ingredient.amount -= amountToRemove;
//                         removalStatusMsg = `Successfully removed ${amountToRemove} ${ingredientData.name}.`
//                     }

//                     // Check if ingredient amount is 0. If so, remove it.
//                     if (ingredient.amount === 0) {
//                         this.ingredientsInPantry.splice(idx, 1);
//                     }
//                 }
//             });
//         }
//         return removalStatusMsg;
//     }

//     // Test me
//     getIngredientDetails(ingredientsData) { // ingredient dictionary passed in
//     let ingredientDetails = this.ingredientsInPantry.map((ingredientInPantry) => {
//         let idMatch = ingredientsData.find(ingredientData => ingredientInPantry.ingredient === ingredientData.id);
//         let currentIngredient = new Ingredient(idMatch);
//         return currentIngredient
//     });
//         return ingredientDetails; // returns ingredient objects
//     }

//     // Test me
//     getIngredientIds(ingredientsData) {
//         let ingredientDetails = this.getIngredientDetails(ingredientsData);
//         console.log(this.ingredientsInPantry);
//         let ingredientIds = ingredientDetails.map(ingredientDetail => ingredientDetail.id);
//         return ingredientIds; // works with ingredient objects, returns array of IDs ['17783', '123123']
//     }

//     // Test me
//     getIngredientNames(ingredientsData) {
//         let ingredientDetails = this.getIngredientDetails(ingredientsData);
//         let ingredientNames = ingredientDetails.map(ingredientDetail => ingredientDetail.name);
//         return ingredientNames; // works with ingredient objects, returns array of names ['cinnamon', 'blueberry']
//     }

//     // Test me
//     getIngredientAmounts() {
//         let ingredientAmounts = this.ingredientsInPantry.map(ingredientInPantry => ingredientInPantry.amount);
//         return ingredientAmounts;  // works with ingredient objects, returns array of amount ['18', '7']
//     }

//     // Test me
//     isAbleToCook(recipe) { // takes in a recipe object
//         // We need to compare ingredient quantities
//         // We have ingredients from a recipe and ingredients from our pantry
//         // Iterate through our recipe ingredients
//         recipe.recipeIngredients.forEach((recIngredient) => {
//             // recipe.getQuantityRequired(recIngredient);
//             // Iterate through ingredients
//         });
//         // console.log(recipe.recipeIngredients);
//     }

//     // isMissing() {

//     // }
// }



