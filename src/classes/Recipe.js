export class Recipe {
    constructor(recipe) {
        this.id = recipe.id;
        this.image = recipe.image;
        this.ingredients = recipe.ingredients; 
    }

    getInstructions() {
        // returns ingredient instructions object
    }

    calculateCost(ingredient) {
        // calculate the cost of the ingredient by cost in cents * quantity
    }

    getTotalCost(ingredients) {// takes in an array of ingredients
        // runs through the array of ingredients summing up the total cost.
        // invokes `calculcateCost()`
    }
};