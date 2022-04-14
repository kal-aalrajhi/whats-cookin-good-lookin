import { Ingredient } from './Ingredient';

export class Pantry {
    constructor(pantry) {
        this.ingredientsInPantry = pantry|| [];

    };

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
        

    removeIngredient(ingredientData, amountToRemove) {
        let pantryIngredient = {
            ingredient: ingredientData.id,
            amount: amountToRemove
        }
        let foundIngredient = this.ingredientsInPantry.find((ingredient) => {
            return pantryIngredient.ingredient === ingredient.ingredient;
        });
        console.log(this.ingredientsInPantry)
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


    getIngredientDetails(ingredientsData) { // ingredient dictionary passed in
    let ingredientDetails = this.ingredientsInPantry.map((ingredientInPantry) => {
        let idMatch = ingredientsData.find(ingredientData => ingredientInPantry.ingredient === ingredientData.id);
        let currentIngredient = new Ingredient(idMatch);
        return currentIngredient
    });
        return ingredientDetails; // returns ingredient objects
    }

    getIngredientIds(ingredientsData) {
        let ingredientDetails = this.getIngredientDetails(ingredientsData);
        console.log(this.ingredientsInPantry);
        let ingredientIds = ingredientDetails.map(ingredientDetail => ingredientDetail.id);
        return ingredientIds; // works with ingredient objects, returns array of IDs ['17783', '123123']
    }

    getIngredientNames(ingredientsData) {
        let ingredientDetails = this.getIngredientDetails(ingredientsData);
        let ingredientNames = ingredientDetails.map(ingredientDetail => ingredientDetail.name);
        return ingredientNames; // works with ingredient objects, returns array of names ['cinnamon', 'blueberry']
    }

    getIngredientAmounts() {
        let ingredientAmounts = this.ingredientsInPantry.map(ingredientInPantry => ingredientInPantry.amount);
        return ingredientAmounts;  // works with ingredient objects, returns array of amount ['18', '7']
    }
}



// import { Ingredient } from './Ingredient';
// // import { Recipe } from './Recipe';
// // import { User } from './User';
// // import { userData } from './data/users-sample-data.js';

// export class Pantry {
//     constructor(userPantry) {
//         this.ingredientsInPantry = userPantry;
//     };

//     getIngredientDetails(ingredientsData) { // ingredient dictionary passed in
//         let ingredientDetails = this.ingredientsInPantry.map((ingredientInPantry) => {
//             let idMatch = ingredientsData.find(ingredientData => ingredientInPantry.ingredient === ingredientData.id);
//             let currentIngredient = new Ingredient(idMatch);
//             return currentIngredient
//         });
//         return ingredientDetails; // returns ingredient objects
//     }

//     getIngredientIds(ingredientsData) {
//         let ingredientDetails = this.getIngredientDetails(ingredientsData);
//         console.log(this.ingredientsInPantry);
//         let ingredientIds = ingredientDetails.map(ingredientDetail => ingredientDetail.id);
//         return ingredientIds; // works with ingredient objects
//     }

//     getIngredientNames(ingredientsData) {
//         let ingredientDetails = this.getIngredientDetails(ingredientsData);
//         let ingredientNames = ingredientDetails.map(ingredientDetail => ingredientDetail.name);
//         return ingredientNames; // works with ingredient objects
//     }

//     getIngredientAmounts() {
//         let ingredientAmounts = this.ingredientsInPantry.map(ingredientInPantry => ingredientInPantry.amount);
//         return ingredientAmounts;
//     }

//     // canUserCookRecipe() {

//     // };
    
//     // getMissingIngredients() {

//     // };
// }


// it('should create a new instance of Recipe', () => {
//     console.log("\nDetails: ", pantry1.getIngredientDetails(allIngredientsData));
//     console.log("\nNames: ", pantry1.getIngredientNames(allIngredientsData));
//     console.log("\nIDs: ", pantry1.getIngredientIds(allIngredientsData));
//     console.log("\nAmounts: ", pantry1.getIngredientAmounts());
// });













                //  // Locate the ingredient
                //  if (ingredient.ingredient === pantryIngredient.ingredient) {
                //     console.log("MATCH!");
                //     console.log("ing amt: ", ingredient.amount);
                //     console.log("pantry: ", amountToRemove);
                //     // Make sure you can't remove more than you have
                //     if (ingredient.amount < amountToRemove) {
                //         return `Sorry you can't remove ${amountToRemove} ${ingredientData.name} when you only have ${ingredient.amount} ${ingredientData.name}.`;
                //     } else { // Substract amount from ingredient
                //         console.log("HERE")
                //         ingredient.amount -= amountToRemove;
                //     }

                //     // Check if ingredient amount is 0. If so, remove it.
                //     if (ingredient.amount === 0) {
                //         this.ingredients.splice(idx, 1);
                //     }

                //     return `Successfully removed ${amountToRemove} ${ingredientData.name}.`
                // }