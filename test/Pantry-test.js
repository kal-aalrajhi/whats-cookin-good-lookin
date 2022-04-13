import { expect } from 'chai';
import { Ingredient } from '../src/classes/Ingredient';
import { Pantry } from '../src/classes/Pantry';
import { ingredientsSampleData } from '../src/data/ingredients-sample-data';
import { usersSampleData } from '../src/data/users-sample-data.js';
import { User } from '../src/classes/User.js'


describe('Pantry', () => {
    let pantry0;
    let pantry1;
    let pantryData;
    let user1;

    beforeEach(() => {
        user1 = new User(usersSampleData[0]);
        pantry0 = new Pantry();
        pantry1 = new Pantry(user1.pantry);
        
    })

    it('should create a new instance of Pantry', () => {
        expect(pantry1).to.be.an.instanceof(Pantry);
    })

    it('should start empty', () => {
        expect(pantry0.ingredients).to.deep.equal([]);
    })


    it('should take in a user pantry', () => {
        expect(pantry1.ingredients).to.deep.equal(user1.pantry);
    })

    
});
