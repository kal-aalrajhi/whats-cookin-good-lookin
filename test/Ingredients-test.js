import { expect } from 'chai';
import { Ingredient } from '../src/classes/Ingredient';
import { ingredientsSampleData } from '../src/data/ingredients-sample-data';

describe('Ingredient', () => {
  let ingredient;
  let ingredientData;

  beforeEach(() => {
    ingredientData = ingredientsSampleData[0];
    ingredient = new Ingredient(ingredientData);
  });

  it('should create a new instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceof(Ingredient);
  });

  it('should have an id', () => {
    expect(ingredient.id).to.equal(20081);
  });

  it('should have a name', () => {
    expect(ingredient.name).to.equal('wheat flour');
  });

  it('should have a cost in cents', () => {
    expect(ingredient.estimatedCostInCents).to.equal(142);
  });

  it('should return a cost in cents', () => {
    expect(ingredient.getCost()).to.equal(142);
  });
});
