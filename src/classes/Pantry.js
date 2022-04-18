import { Ingredient } from './Ingredient';

export class Pantry {
    constructor(pantry) { 
        this.ingredientsInPantry = pantry || [];
    };

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
    
    useRecipeIngredients(recipe, ingredientData) {
        let logMessages = [];
        recipe.recipeIngredients.forEach(ingredient => {
            logMessages.push(this.removeIngredientById(ingredient.id, ingredient.quantity.amount, ingredientData));
        });
        return logMessages;
    }

    removeIngredientById(ingredientId, amountToRemove, ingredientData) {
        if (!ingredientId) {
            return "Sorry, not a valid ingredient you can remove.";
        }
        
        let ingredientName = this.getIngredientNameById(ingredientId, ingredientData);
        let pantryIngredient = {
            ingredient: ingredientId,
            amount: Number(-amountToRemove) 
        }
        let foundIngredient = this.ingredientsInPantry.find((ingredient) => {
            return pantryIngredient.ingredient === ingredient.ingredient;
        });

        let removalStatusMsg = "";
        if(!foundIngredient) {
            removalStatusMsg = `You do not have any ${ingredientName} to remove.`;
        } else {
             this.ingredientsInPantry.forEach((ingredient, idx) => {
                if (ingredient.ingredient === pantryIngredient.ingredient) {
                    if (ingredient.amount < amountToRemove) {
                        removalStatusMsg = `Sorry you can't remove ${amountToRemove} ${ingredientName} when you only have ${ingredient.amount} ${ingredientName}.`;
                    } else { 
                        ingredient.amount += Number(pantryIngredient.amount);
                        removalStatusMsg = `Successfully removed ${amountToRemove} ${ingredientName}, you have ${ingredient.amount} left.`
                    }

                    if (ingredient.amount === 0) {
                        this.ingredientsInPantry.splice(idx, 1);
                    }
                }
            });
        }
        return removalStatusMsg;
    }

    getIngredientDetails(ingredientsData) { 
        let ingredientDetails = this.ingredientsInPantry.map((ingredientInPantry) => {
            let idMatch = ingredientsData.find(ingredientData => ingredientInPantry.ingredient === ingredientData.id);
            let currentIngredient = new Ingredient(idMatch);
            return currentIngredient
        });
        return ingredientDetails; 
    }

    getCurrentQuantity(ingredientId) {
        let ingredientToFind = this.ingredientsInPantry.find(pantryIngredient => pantryIngredient.ingredient === ingredientId);
        if(!ingredientToFind) {
            return 0;
        }
        return ingredientToFind.amount;
    };

    getIngredientIdByName(ingredientName, ingredientData) {
        let ingredientToFind = ingredientData.find(ingredient => ingredient.name === ingredientName);
        if (!ingredientToFind) {
            return 0;
        }
        return ingredientToFind.id; 
    }

    getIngredientNameById(ingredientId, ingredientData) {
        let ingredientToFind = ingredientData.find(ingredient => ingredient.id === ingredientId);
        return ingredientToFind.name; 
    }

    getIngredientIds(ingredientsData) {
        let ingredientDetails = this.getIngredientDetails(ingredientsData);
        let ingredientIds = ingredientDetails.map(ingredientDetail => ingredientDetail.id);
        return ingredientIds; 
    }

    getIngredientNames(ingredientsData) {
        let ingredientDetails = this.getIngredientDetails(ingredientsData);
        let ingredientNames = ingredientDetails.map(ingredientDetail => ingredientDetail.name);
        return ingredientNames; 
    }

    getIngredientAmounts() {
        let ingredientAmounts = this.ingredientsInPantry.map(ingredientInPantry => ingredientInPantry.amount);
        return ingredientAmounts;  
    }

    compareRecipeToPantry(recipe, ingredientsData) { 
        const recipeToPantryIngredients = recipe.recipeIngredients.map((recIngredient) => {
            let ingredientName = ingredientsData.find(ingredientData => ingredientData.id === recIngredient.id).name;
            let ingredientFromPantry = this.ingredientsInPantry.find(ingredientInPantry => ingredientInPantry.ingredient === recIngredient.id);
            
            let ingredientFromPantryAmount = 0; 
            if (ingredientFromPantry) {
                ingredientFromPantryAmount = ingredientFromPantry.amount;
            } 
            
            let amountNeeded = recIngredient.quantity.amount - ingredientFromPantryAmount; 
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
        if (!this.getMissingIngredients(recipe, ingredientsData).length){ 
            return false;
        } else {
            return true;
        }
    }
}