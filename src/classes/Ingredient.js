export class Ingredient {
  constructor(ingredient) {
    this.id = ingredient.id;
    this.name = ingredient.name;
    this.estimatedCostInCents = ingredient.estimatedCostInCents;
  };

  getCost() {
    return this.estimatedCostInCents;
  };
};
