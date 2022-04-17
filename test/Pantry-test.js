import { expect } from 'chai';
import { Pantry } from '../src/classes/Pantry';
import { Recipe } from '../src/classes/Recipe';
import { ingredientsSampleDataLarge } from '../src/data/ingredients-sample-data-large';
import { usersSampleData } from '../src/data/users-sample-data.js';
import { recipesSampleData } from '../src/data/recipes-sample-data.js';
import { User } from '../src/classes/User.js'


describe('Pantry Test', () => {
    let user1, user2;
    let emptyPantry, pantry1;
    let recipeData, ingredientsDataLarge;
    let recipe1, recipe2;
    let ingredient1Id, ingredient2Id;

    beforeEach(() => {
        user1 = new User(usersSampleData[3]); // Cookie Monster
        user2 = new User(usersSampleData[0]); 
        emptyPantry = new Pantry();
        pantry1 = new Pantry(user1.pantry);
        ingredientsDataLarge = ingredientsSampleDataLarge;
        recipeData = recipesSampleData;
        recipe1 = new Recipe(recipeData[0]); // Cookie recipe
        recipe2 = new Recipe(recipeData[1]); 
        ingredient1Id = 0;
        ingredient2Id = 0;
    });

    it('should create a new instance of Pantry', () => {
        expect(pantry1).to.be.an.instanceof(Pantry);
    });

    it('should start empty', () => {
        expect(emptyPantry.ingredientsInPantry).to.deep.equal([]);
    });

    it('should take in a user pantry', () => {
        expect(pantry1.ingredientsInPantry).to.deep.equal(user1.pantry);
    });

    it('should get all ingredients in pantry details', () => {
        expect(user1.pantry.getIngredientDetails(ingredientsDataLarge)).to.deep.equal([
            {
              id: 20081,
              name: 'wheat flour',
              estimatedCostInCents: 142
            },
            {
              id: 18372,
              name: 'bicarbonate of soda',
              estimatedCostInCents: 582
            },
            { id: 1123, name: 'eggs', estimatedCostInCents: 472 },
            { id: 19335, name: 'sucrose', estimatedCostInCents: 902 },
            {
              id: 19206,
              name: 'instant vanilla pudding',
              estimatedCostInCents: 660
            }
          ]);
    });

    it('should get all ingredients in pantry ids', () => {
        expect(user1.pantry.getIngredientIds(ingredientsDataLarge)).to.deep.equal([ 20081, 18372, 1123, 19335, 19206 ]);
    });

    it('should get all ingredients in pantry names', () => {
        expect(user1.pantry.getIngredientNames(ingredientsDataLarge)).to.deep.equal([
            'wheat flour',
            'bicarbonate of soda',
            'eggs',
            'sucrose',
            'instant vanilla pudding'
          ]);
    });

    it('should get all ingredients in pantry quantity', () => {
        expect(user1.pantry.getIngredientAmounts(ingredientsDataLarge)).to.deep.equal([ 999, 999, 999, 999, 999 ]);
    });

    it('should get an ingredient quantity by id', () => {
        ingredient1Id = 20081;
        ingredient2Id = 1123;
        expect(user1.pantry.getCurrentQuantity(ingredient1Id)).to.equal(999);
        expect(user1.pantry.getCurrentQuantity(ingredient2Id)).to.equal(999);
    });

    it('should get an ingredient id by name', () => {
        expect(user1.pantry.getIngredientIdByName('wheat flour', ingredientsDataLarge)).to.equal(20081);
        expect(user1.pantry.getIngredientIdByName('eggs', ingredientsDataLarge)).to.equal(1123);
    });

    it('should get an ingredient name by id', () => {
        ingredient1Id = 20081;
        ingredient2Id = 1123;
        expect(user1.pantry.getIngredientNameById(ingredient1Id, ingredientsDataLarge)).to.equal('wheat flour');
        expect(user1.pantry.getIngredientNameById(ingredient2Id, ingredientsDataLarge)).to.equal('eggs');
    });

    it('Should check against undefined ingredient Ids', () => {
        ingredient1Id = null;
        expect(user1.pantry.removeIngredientById(ingredient1Id, 2, ingredientsDataLarge)).to.equal("Sorry, not a valid ingredient you can remove.");
    });

    it('Should make sure you have the ingredient to be removed available', () => {
        ingredient1Id = 9266;
        expect(user1.pantry.removeIngredientById(ingredient1Id, 2, ingredientsDataLarge)).to.equal("You do not have any pineapple to remove.");
    });

    it('Should compare recipe ingredients to pantry ingredients', () => {
        expect(user1.pantry.compareRecipeToPantry(recipe1, ingredientsDataLarge)).to.deep.equal([
            {
              id: 20081,
              name: 'wheat flour',
              amountRequired: 1.5,
              amountInPantry: 999,
              amountNeeded: 0
            },
            {
              id: 18372,
              name: 'bicarbonate of soda',
              amountRequired: 0.5,
              amountInPantry: 999,
              amountNeeded: 0
            },
            {
              id: 1123,
              name: 'eggs',
              amountRequired: 1,
              amountInPantry: 999,
              amountNeeded: 0
            },
            {
              id: 19335,
              name: 'sucrose',
              amountRequired: 0.5,
              amountInPantry: 999,
              amountNeeded: 0
            },
            {
              id: 19206,
              name: 'instant vanilla pudding',
              amountRequired: 3,
              amountInPantry: 999,
              amountNeeded: 0
            }
          ]);
    });

    it('Should detail which ingredients are missing', () => {
        expect(user2.pantry.getMissingIngredients(recipe1, ingredientsDataLarge)).to.deep.equal([
            {
              id: 19206,
              name: 'instant vanilla pudding',
              amountRequired: 3,
              amountInPantry: 2,
              amountNeeded: 1
            }
          ]);

        expect(user2.pantry.getMissingIngredients(recipe2, ingredientsDataLarge)).to.deep.equal([
            {
                id: 1009016,
                name: 'apple cider',
                amountRequired: 1.5,
                amountInPantry: 0,
                amountNeeded: 1.5
            },
            {
                id: 20027,
                name: 'corn starch',
                amountRequired: 1,
                amountInPantry: 0,
                amountNeeded: 1
            },
            {
                id: 1002046,
                name: 'dijon style mustard',
                amountRequired: 1,
                amountInPantry: 0,
                amountNeeded: 1
            },
            {
                id: 1012046,
                name: 'whole grain dijon mustard',
                amountRequired: 1,
                amountInPantry: 0,
                amountNeeded: 1
            },
            {
                id: 19911,
                name: 'maple',
                amountRequired: 0.25,
                amountInPantry: 0,
                amountNeeded: 0.25
            },
            {
                id: 16112,
                name: 'miso',
                amountRequired: 1,
                amountInPantry: 0,
                amountNeeded: 1
            },
            {
                id: 10010062,
                name: 'pork chop',
                amountRequired: 24,
                amountInPantry: 0,
                amountNeeded: 24
            },
            {
                id: 1102047,
                name: 's&p',
                amountRequired: 4,
                amountInPantry: 2,
                amountNeeded: 2
            },
            {
                id: 16124,
                name: 'soy sauce',
                amountRequired: 1,
                amountInPantry: 0,
                amountNeeded: 1
            },
            {
                id: 1016168,
                name: 'sriracha sauce',
                amountRequired: 1,
                amountInPantry: 0,
                amountNeeded: 1
            }
        ]);
    });

    it('Should say if at least one recipe ingredient is missing from users pantry', () => {
        expect(user1.pantry.isIngredientMissing(recipe1, ingredientsDataLarge)).to.equal(false);
        expect(user1.pantry.isIngredientMissing(recipe2, ingredientsDataLarge)).to.equal(true);
        expect(user2.pantry.isIngredientMissing(recipe1, ingredientsDataLarge)).to.equal(true);
    });

    it('Should add an ingredient by id and amount to users pantry', () => {
        ingredient1Id = 10123;
        ingredient2Id = 9214;

        expect(user2.pantry.addIngredientById(ingredient1Id, 10, ingredientsDataLarge)).to.equal("Successfully added 10 bacon slices to your pantry.");
        expect(user2.pantry.addIngredientById(ingredient2Id, 22, ingredientsDataLarge)).to.equal("Successfully added 22 orange juice concentrate to your pantry.");
    });

    it('Should add only an amount if ingredient already in users pantry', () => {
        ingredient1Id = 20081;
        ingredient2Id = 1123;

        expect(user2.pantry.addIngredientById(ingredient1Id, 10, ingredientsDataLarge)).to.equal("Successfully added 10 more wheat flour to your pantry.");
        expect(user2.pantry.addIngredientById(ingredient2Id, 22, ingredientsDataLarge)).to.equal("Successfully added 22 more eggs to your pantry.");
    });

    it('Should check for an ingredient id', () => {
        ingredient1Id = null;

        expect(user2.pantry.addIngredientById(ingredient1Id, 10, ingredientsDataLarge)).to.equal("Sorry, not a valid ingredient you can add.");
        expect(user2.pantry.addIngredientById(ingredient2Id, 22, ingredientsDataLarge)).to.equal("Sorry, not a valid ingredient you can add.");
    });

    it('When passing in a recipe, respective ingredients should be removed from the pantry', () => {
        expect(user1.pantry.ingredientsInPantry).to.deep.equal([
            { ingredient: 20081, amount: 999 },
            { ingredient: 18372, amount: 999 },
            { ingredient: 1123, amount: 999 },
            { ingredient: 19335, amount: 999 },
            { ingredient: 19206, amount: 999 }
        ]);

        user1.pantry.useRecipeIngredients(recipe1, ingredientsDataLarge);

        expect(user1.pantry.ingredientsInPantry).to.deep.equal([
              { ingredient: 20081, amount: 997.5 },
              { ingredient: 18372, amount: 998.5 },
              { ingredient: 1123, amount: 998 },
              { ingredient: 19335, amount: 998.5 },
              { ingredient: 19206, amount: 996 }
        ]);
    });

    it('If ingredient amount is 0, then remove it from the pantry', () => {
        ingredient1Id = 19206;

        expect(user1.pantry.ingredientsInPantry).to.deep.equal([
            { ingredient: 20081, amount: 997.5 },
            { ingredient: 18372, amount: 998.5 },
            { ingredient: 1123, amount: 998 },
            { ingredient: 19335, amount: 998.5 },
            { ingredient: 19206, amount: 996 }
        ]);

        user1.pantry.removeIngredientById(ingredient1Id, 996, ingredientsDataLarge);
        
        expect(user1.pantry.ingredientsInPantry).to.deep.equal([
            { ingredient: 20081, amount: 997.5 },
            { ingredient: 18372, amount: 998.5 },
            { ingredient: 1123, amount: 998 },
            { ingredient: 19335, amount: 998.5 }
        ]);
    });

    it('Ingredients can be removed from the pantry', () => {
        ingredient1Id = user1.pantry.ingredientsInPantry[0].ingredient;
        ingredient2Id = user1.pantry.ingredientsInPantry[1].ingredient;

        expect(user1.pantry.removeIngredientById(ingredient1Id, 200, ingredientsDataLarge)).to.equal("Successfully removed 200 wheat flour, you have 797.5 left.");
        expect(user1.pantry.removeIngredientById(ingredient2Id, 400, ingredientsDataLarge)).to.equal("Successfully removed 400 bicarbonate of soda, you have 598.5 left.");
    });
});
