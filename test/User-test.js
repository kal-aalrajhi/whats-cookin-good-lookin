import { expect } from 'chai';
import { Recipe } from '../src/classes/Recipe';
import { recipesSampleData } from '../src/data/recipes-sample-data';
import { ingredientsData } from '../src/data/ingredients';
import { User } from '../src/classes/User.js'
import { userSampleData } from '../src/data/users-sample-data.js'

describe('User', () => {
  let user;
  let userData;

  beforeEach(() => {
    user = new User();
    userData = userSampleData;
  })

  it('should create a new instance of User', () => {
    expect(user).to.be.an.instanceof(User);
  })

  
});

//favorite recipe should be an empty array
//recipes to cook should be an empty array
//should favorite recipe
//should add recipes to cook
