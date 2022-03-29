import { expect } from 'chai';
import Recipe from '../src/classes/Recipe';

describe('Recipe', () => {
    let recipe;
    beforeEach( () => {
        recipe = new Recipe();
    });

    it('should be a function', () => {
        expect(Recipe).to.be.a('function');
    });

    it('should create a new instance of Recipe', () => {
        expect(recipe).to.be.an.instanceof(Recipe);
    });
});