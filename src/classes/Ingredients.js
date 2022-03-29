class Ingredients {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.estimatedCostInCents = ingredient.estimatedCostInCents;
  }
  ingredientsCost() {
    return this.estimatedCostInCents;
  }
};

module.exports = Ingredients;
