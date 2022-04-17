import { Ingredient } from './Ingredient';

export class Pantry {
    constructor(pantry) { // Remember that Pantry is only accessed via the User
        this.ingredientsInPantry = pantry || [];
    };

    // Test me 
    addIngredientById(ingredientId, amount, ingredientData) {
        if (!ingredientId) {
            return "Sorry, not a valid ingredient you can add.";
        }

        let ingredientName = this.getIngredientNameById(ingredientId, ingredientData);        
        let pantryIngredient = {
            ingredient: ingredientId,
            amount: Number(amount)
        }
        let foundIngredient = this.ingredientsInPantry.find((ingredient) => {
            return pantryIngredient.ingredient === ingredient.ingredient;
        });
        
        if(!foundIngredient) {
            this.ingredientsInPantry.push(pantryIngredient);
            return `Successfully added ${pantryIngredient.amount} ${ingredientName} to your pantry.`;
        } else {
             this.ingredientsInPantry.forEach((ingredient) => {
                if(ingredient.ingredient === pantryIngredient.ingredient) {
                    ingredient.amount += Number(pantryIngredient.amount);
                }
            });
            return `Successfully added ${pantryIngredient.amount} more ${ingredientName} to your pantry.`;
        }
    }
    
    // Test return message
    useRecipeIngredients(recipe, ingredientData) {
        // iterate through recipe ingredients to get Id and call remove ingredient on each recipe.
        recipe.recipeIngredients.forEach(ingredient => {
            console.log(this.removeIngredientById(ingredient.id, ingredient.quantity.amount, ingredientData));
        });
        return `${recipe.name} successfully cooked.`;
    }

    // Test me 
    removeIngredientById(ingredientId, amountToRemove, ingredientData) {
        if (!ingredientId) {
            return "Sorry, not a valid ingredient you can remove.";
        }
        
        let ingredientName = this.getIngredientNameById(ingredientId, ingredientData);
        let pantryIngredient = {
            ingredient: ingredientId,
            amount: Number(-amountToRemove) // Just make the additon function but add a NEGATIVE amount instead!!
        }
        let foundIngredient = this.ingredientsInPantry.find((ingredient) => {
            return pantryIngredient.ingredient === ingredient.ingredient;
        });

        let removalStatusMsg = "";
        // Check if ingredient is in pantry
        if(!foundIngredient) {
            removalStatusMsg = `You do not have any ${ingredientName} to remove.`;
        } else {
             this.ingredientsInPantry.forEach((ingredient, idx) => {
                 // Locate the ingredient
                if (ingredient.ingredient === pantryIngredient.ingredient) {
                    // Make sure you can't remove more than you have
                    if (ingredient.amount < amountToRemove) {
                        removalStatusMsg = `Sorry you can't remove ${amountToRemove} ${ingredientName} when you only have ${ingredient.amount} ${ingredientName}.`;
                    } else { // Substract amount from ingredient
                        ingredient.amount += Number(pantryIngredient.amount);
                        removalStatusMsg = `Successfully removed ${amountToRemove} ${ingredientName}, you have ${ingredient.amount} left.`
                    }

                    // Check if ingredient amount is 0. If so, remove it from pantry.
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
    getIngredientIdByName(ingredientName, ingredientData) {
        let ingredientToFind = ingredientData.find(ingredient => ingredient.name === ingredientName);
        if (!ingredientToFind) {
            return 0;
        }
        return ingredientToFind.id; 
    }

    // Test me
    getIngredientNameById(ingredientId, ingredientData) {
        let ingredientToFind = ingredientData.find(ingredient => ingredient.id === ingredientId);
        return ingredientToFind.name; 
    }

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
        // take off ! to get checkmark to appear
        if (!this.getMissingIngredients(recipe, ingredientsData).length){ 
            return false;
        } else {
            return true;
        }
    }
}