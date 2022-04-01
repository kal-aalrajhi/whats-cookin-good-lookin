export class RecipeRepository {
  constructor(recipes = []) {
    this.recipes = recipes;
  }

  addRecipes(recipeCollection) {
    if(Array.isArray(recipeCollection)) {
      recipeCollection.forEach((recipe) => {
        this.recipes.push(recipe);
      });
    } else {
      this.recipes.push(recipeCollection);
    }
  }

  filterByTag(tagToFilter) {
    const recipesWithTag = this.recipes.reduce((acc, recipe) => {
      let recipeWithSameTag = recipe.tags.find((tag) => tag === tagToFilter);
      if (recipeWithSameTag !== undefined) {
        acc.push(recipe);
      }
      return acc;
    }, []);
    return recipesWithTag;
  }

  filterByName() {
    const justNames = this.recipes.map((recipe) => {
      return recipe.name;
    });
    return justNames;
  }

  filterById(recipeIdtoFind) {
    const recipeById = this.recipes.find((recipe) => {
      return Number(recipeIdtoFind) === recipe.id;
    });
    return recipeById;
  }
}
