import { Ingredient } from './Ingredient';

export class Recipe {
    constructor(recipe) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.recipeIngredients = recipe.ingredients;
        this.instructions = recipe.instructions;
        this.name = recipe.name;
        this.tags = recipe.tags;
        this.favorite = false;
        this.toCook = false;
        this.timesCooked = 0; 
    };

    getIngredientDetails(ingredientsData) {
        let ingredientDetails = this.recipeIngredients.map((recipeIngredient) => {
                let idMatch = ingredientsData.find(ingredientData => recipeIngredient.id === ingredientData.id);
                
                let currentIngredient = new Ingredient(idMatch);
                
                return currentIngredient;
            });
        return ingredientDetails;
    };
    
    getQuantityRequired(ingredientId) {
        let ingredientToFind = this.recipeIngredients.find(recipeIngredient => recipeIngredient.id === ingredientId);
        return ingredientToFind.quantity.amount;
    };

    getIngredientName(ingredientId, ingredientsData) {
        let ingredientDetails = this.getIngredientDetails(ingredientsData);
        let ingredientToFind = ingredientDetails.find(ingredientDetail => ingredientDetail.id === ingredientId);
        return ingredientToFind.name;
    }

    getIngredientNames(ingredientsData) {
        let ingredientDetails = this.getIngredientDetails(ingredientsData)
        let ingredientNames = ingredientDetails.map(ingredientDetail => ingredientDetail.name);
        return ingredientNames;
    };

    getIngredientIds(ingredientsData) {
        let ingredientDetails = this.getIngredientDetails(ingredientsData)
        let ingredientNames = ingredientDetails.map(ingredientDetail => ingredientDetail.id);
        return ingredientNames;
    };
 
    getTotalCostInDollars(ingredientsData) {
        let ingredientDetails =  this.getIngredientDetails(ingredientsData);
        let totalCostInCents = ingredientDetails.reduce((total, ingredientDetail, idx) => {
        return total + (ingredientDetail.estimatedCostInCents * this.recipeIngredients[idx].quantity.amount);
        }, 0);
        let totalCostInDollars = (totalCostInCents / 100).toFixed(2);
        return totalCostInDollars;
    };

    getInstructions() {
        return this.instructions;
    };
};
