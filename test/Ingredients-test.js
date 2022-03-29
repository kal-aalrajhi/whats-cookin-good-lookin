import { expect } from 'chai';
import Ingredients from '../src/classes/Ingredients';

describe('Ingredient', () => {
  let ingredient;
  let ingredientData;

  beforeEach(() => {
    ingredientData = {
      "id": 20081,
      "name": "wheat flour",
      "estimatedCostInCents": 142
    };
    ingredient = new Ingredients(ingredientData);
  });

  it('should create a new instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceof(Ingredients);
  });

  it('should have an id', () => {
    expect(ingredient.id).to.equal(20081);
  });

  it('should have a name', () => {
    expect(ingredient.name).to.equal('wheat flour');
  });

  it('should return cost in cents', () => {
    expect(ingredient.estimatedCostInCents).to.equal(142);
  });
});
