import apiCalls from './apiCalls';
import './styles.css';
import { fetchResponse } from './apiCalls';
import { getRecipeBox, searchErrorMsg, clearView, recipeDetails, iconToFull, iconToEmpty, 
         showElement, hideElement, loadPantry, displayCookMessages, loadTimesCooked, loadTagSuggestions} from './domUpdates';
import { RecipeRepository } from '../src/classes/RecipeRepository';
import { User } from './classes/User';
import { Recipe } from '../src/classes/Recipe';
import './images/apple-pie-home.jpg';
import './images/food-icon-light.png';
import './images/full-star.png';
import './images/empty-star.png';
import './images/full-to-cook.png';
import './images/empty-to-cook.png';
import './images/check-mark.png';

// Global Variables
let allIngredientsData = [];
let allRecipeStorage = new RecipeRepository();
let allRecipeData = [];
let usersData = [];
let currentUser = {};

// Query Selectors
const homeView = document.querySelector("#homeView");
const searchResultView = document.querySelector("#searchResultView");
const allRecipeView = document.querySelector("#allRecipeView");
const recipeDetailView = document.querySelector("#recipeDetailView");
const findByNameView = document.querySelector("#findByNameView");
const searchResultsView = document.querySelector("#searchResultsView");
const favoriteRecipesView = document.querySelector("#favoriteRecipeView");
const toCookView = document.querySelector("#toCookView");
const pantryView = document.querySelector("#pantryView");
const pantryList = document.querySelector("#pantryList");
const searchFavBarsView = document.querySelector("#favSearchBar");
const findByTagView = document.querySelector("#findByTagView");
const recipeDetailCard = document.querySelector("#recipeDetailCard");
const instructionsList = document.querySelector("#instructionsList");
const toCookTitle = document.querySelector("#toCookTitle");

const homeBtnIcon = document.querySelector("#homeBtnIcon");
const homeBtn = document.querySelector("#homeBtn");
const showAllRecipesBtn = document.querySelector("#allRecipesBtn");
const showFavoriteBtn = document.querySelector("#favoriteRecipesBtn");
const findNameBtn = document.querySelector("#findNameBtn");
const findTagBtn = document.querySelector("#findTagBtn");
const toCookBtn = document.querySelector("#toCookBtn");
const pantryBtn = document.querySelector("#pantryBtn");
const addIngredientBtn = document.querySelector("#addIngredientBtn");
const searchNameBtn = document.querySelector("#nameSearchBtn");
const searchTagBtn = document.querySelector("#tagSearchBtn");
const searchFavNameBtn = document.querySelector("#favNameSearchBtn");
const searchFavTagBtn = document.querySelector("#favTagSearchBtn");
const searchNameInput = document.querySelector("#searchByNameInput");
const searchTagInput = document.querySelector("#searchByTagInput");
const searchFavNameInput = document.querySelector("#favSearchByNameInput");
const searchFavTagInput = document.querySelector("#favSearchByTagInput");
const addIngredientInput = document.querySelector("#addIngredientInput");
const addAmountInput = document.querySelector("#addAmountInput");

// Event Listeners
window.addEventListener("load", loadData);

showAllRecipesBtn.addEventListener("click", loadAllRecipesView);
findNameBtn.addEventListener("click", loadNameSearchView);
findTagBtn.addEventListener("click", loadTagSearchView);
showFavoriteBtn.addEventListener("click", loadFavoriteView);
homeBtn.addEventListener("click", loadHomeView);
homeBtnIcon.addEventListener("click", loadHomeView);
toCookBtn.addEventListener("click", loadToCookView);
pantryBtn.addEventListener("click", loadPantryView);
searchResultsView.addEventListener("click", loadRecipeDetailView);

recipeDetailView.addEventListener("click", (event) => {
  if (event.target.classList.contains("empty-star")) {
    addFavoriteRecipe(event);
  } else if (event.target.classList.contains("full-star")) {
    removeFavoriteRecipe(event);
  }

  if (event.target.classList.contains("empty-to-cook")) {
    addToCookRecipe(event);
  } else if (event.target.classList.contains("full-to-cook")) {
    removeToCookRecipe(event);
  }

  if (event.target.classList.contains("check-mark-icon")) {
    loadRecipeDetailView(event);
    cookRecipe(event);
  } 
});

favoriteRecipesView.addEventListener("click", (event) => {
  loadRecipeDetailView(event);
});

toCookView.addEventListener("click", (event) => {
  loadRecipeDetailView(event);
});

allRecipeView.addEventListener("click", (event) => {
 loadRecipeDetailView(event);
});

searchNameBtn.addEventListener("click", () => {
  let searchingForName = grabSearchValue("name");
  searchRecipeByName(searchingForName);
  searchNameInput.value = "";
});

searchTagBtn.addEventListener("click", () => {
  let searchingForTag = grabSearchValue("tag");
  searchRecipeByTag(searchingForTag);
  searchTagInput.value = "";
});

searchFavNameBtn.addEventListener("click", () => {
  let searchingForFavName = grabSearchValue("favorite name");
  searchFavRecipeByName(searchingForFavName);
  searchFavNameInput.value = "";
});

searchFavTagBtn.addEventListener("click", () => {
  let searchingForFavTag = grabSearchValue("favorite tag");
  searchFavRecipeByTag(searchingForFavTag);
  searchFavTagInput.value = "";
});

addIngredientBtn.addEventListener("click", () => {
  let ingredientToAdd = grabSearchValue("ingredient to add");
  let amountToAdd = grabSearchValue("amount to add");
  addIngredientToPantry(ingredientToAdd, amountToAdd);
  addIngredientInput.value = "";
  addAmountInput.value = "";
});

function addIngredientToPantry(ingredientToAddName, amountToAdd) {
  event.preventDefault();
  let ingredientToAddId = currentUser.pantry.getIngredientIdByName(ingredientToAddName, allIngredientsData);
  let addStatus = currentUser.pantry.addIngredientById(ingredientToAddId, amountToAdd, allIngredientsData)
  loadPantry(pantryList, allIngredientsData, currentUser, addStatus);
}

import { usersSampleData } from '../src/data/users-sample-data.js'; // DELETE ME
// Functions
function loadData() {
  const fetchRecipes = fetchResponse("http://localhost:3001/api/v1/recipes");
  const fetchUsers = fetchResponse("http://localhost:3001/api/v1/users");
  const fetchIngredients = fetchResponse("http://localhost:3001/api/v1/ingredients");

  Promise.all([fetchRecipes, fetchUsers, fetchIngredients]).then((data) => {
    // allRecipeData = data[0].recipeData;
    allRecipeData = data[0];
    allRecipeStorage.addRecipes(allRecipeData);
  
    usersData = data[1];
    const randomIndex = Math.floor(Math.random() * usersData.length)
    // currentUser = new User(usersData[randomIndex]);
    currentUser = new User(usersSampleData[4]); // DELETE
    allIngredientsData = data[2];
  })
  .catch((err) => console.log(err));
}

function grabSearchValue(byValue) {
  if (byValue === "name") {
    return searchNameInput.value.toLowerCase();
  } else if (byValue === "tag") {
    return searchTagInput.value.toLowerCase();
  } else if (byValue === "favorite name") {
    return searchFavNameInput.value.toLowerCase();
  } else if (byValue === "favorite tag") {
    return searchFavTagInput.value.toLowerCase();
  } else if (byValue === "ingredient to add") {
    return addIngredientInput.value.toLowerCase();
  } else if (byValue === "amount to add") {
    return addAmountInput.value;
  }
}

function hideAllViews() {
  hideElement(homeView);
  hideElement(searchResultView);
  hideElement(allRecipeView);
  hideElement(findByNameView);
  hideElement(findByTagView);
  hideElement(recipeDetailView);
  hideElement(searchResultsView);
  hideElement(favoriteRecipesView);
  hideElement(searchFavBarsView);
  hideElement(toCookView);
  hideElement(pantryView);
  hideElement(toCookTitle);
}

function loadFavoriteView() {
  hideAllViews();
  showElement(searchResultView);
  showElement(favoriteRecipesView);
  showElement(searchFavBarsView);
  favoriteCurrentRecipe();
}

function loadToCookView() {
  hideAllViews();
  showElement(toCookTitle);
  showElement(searchResultView);
  showElement(toCookView);
  toCookCurrentRecipe();

}

function loadPantryView() {
  hideAllViews();
  showElement(pantryView); 
  loadPantry(pantryList, allIngredientsData, currentUser);
}

function loadHomeView() {
  hideAllViews();
  showElement(homeView);
}
function loadNameSearchView() {
  hideAllViews();
  showElement(searchResultView);
  showElement(findByNameView);
}

function loadTagSearchView() {
  hideAllViews();
  showElement(searchResultView);
  showElement(findByTagView);
  loadTagSuggestions();
}

function cookRecipe(event) {
  let cookedRecipe = allRecipeData.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  cookedRecipe = new Recipe(cookedRecipe);
  let useIngredientUpdates = document.querySelector("#useIngredientUpdates");
  let useIngredientMessages = currentUser.pantry.useRecipeIngredients(cookedRecipe, allIngredientsData);
  displayCookMessages(useIngredientUpdates, useIngredientMessages);

  let result = currentUser.recipesCooked.find(recipe => {
    return recipe.id === Number(event.target.id);
  });

  if (!result) {
    cookedRecipe.timesCooked++;
    currentUser.addRecipesCooked(cookedRecipe);
  } else {
    result.timesCooked++;
  }

  loadTimesCooked(recipeDetailCard, currentUser, cookedRecipe);
}

function addFavoriteRecipe(event) {
  iconToFull("star");
  let recipeToAdd = allRecipeData.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  recipeToAdd = new Recipe(recipeToAdd);
  recipeToAdd.favorite = true;
  
  let result = currentUser.favoriteRecipes.find(recipe => {
    return recipe.id === Number(event.target.id);
  });
  if (!result) {
    currentUser.addFavoriteRecipe(recipeToAdd);
  }
}

function removeFavoriteRecipe(event) {
  iconToEmpty("star");
  let recipeToRemove = allRecipeData.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  recipeToRemove.favorite = false;
  
  let result = currentUser.favoriteRecipes.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  if (result) {
    let recipeIdx = currentUser.favoriteRecipes.indexOf(result);
    currentUser.favoriteRecipes.splice(recipeIdx, 1);
  }
}

function favoriteCurrentRecipe() {
  clearView(favoriteRecipesView);
  currentUser.favoriteRecipes.forEach((recipe) => {
    getRecipeBox(favoriteRecipesView, recipe);
  });
}

function addToCookRecipe(event) {
  iconToFull("to-cook");
  var recipeToAdd = allRecipeData.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  recipeToAdd = new Recipe(recipeToAdd);
  recipeToAdd.toCook = true;
  var result = currentUser.recipesToCook.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  if (!result) {
    currentUser.addRecipesToCook(recipeToAdd);
  }
}

function toCookCurrentRecipe() {
  clearView(toCookView);
  currentUser.recipesToCook.forEach((recipe) => {
    getRecipeBox(toCookView, recipe);
  });
}

function removeToCookRecipe(event) {
  iconToEmpty("to-cook");
  let recipeToRemove = allRecipeData.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  recipeToRemove.favorite = false;
  let result = currentUser.recipesToCook.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  if (result) {
    let recipeIdx = currentUser.recipesToCook.indexOf(result);
    currentUser.recipesToCook.splice(recipeIdx, 1);
  }
}

function loadAllRecipesView() {
  hideAllViews();
  showElement(searchResultView);
  showElement(allRecipeView);

  clearView(allRecipeView);
  allRecipeStorage.recipes.forEach((recipe) => {
    getRecipeBox(allRecipeView, recipe);
  });
}

function loadRecipeDetailView(event) {
  if (event.target.id !== "searchResultView" && event.target.id !== "allRecipeView" && event.target.id !== "recipeDetailView") {
    hideAllViews();
    showElement(searchResultView);
    showElement(recipeDetailView);
  }
  let currentRecipe = "";

  if (event.target.id) {
    currentRecipe = allRecipeStorage.filterById(event.target.id);
    
    let isFavorite = currentUser.favoriteRecipes.some(recipe => {
      return recipe.id === currentRecipe.id;
    });
    let isWantingToCook = currentUser.recipesToCook.some(recipe => {
      return recipe.id === currentRecipe.id;
    });

    recipeDetails(recipeDetailCard, currentRecipe, instructionsList, allIngredientsData, currentUser);
    
    if(isFavorite) {
      iconToFull("star");
    } else {
      iconToEmpty("star");
    }

    if (isWantingToCook) {
      iconToFull("to-cook");
    } else {
      iconToEmpty("to-cook");
    }
  }
}

function searchRecipeByName(searchingFor) {
  event.preventDefault();
  let nameResults = allRecipeStorage.recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchingFor);
  });
  showElement(searchResultsView);
  clearView(searchResultsView);
  if(!nameResults.length) {
    searchErrorMsg(searchResultsView);
  } else {
    nameResults.forEach((recipe) => {
      getRecipeBox(searchResultsView, recipe);
    });
  }
}

function searchFavRecipeByName(searchingFor) {
  event.preventDefault();
  let nameResults = currentUser.favoriteRecipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchingFor);
  });
  showElement(favoriteRecipesView);
  clearView(favoriteRecipesView);
  if(!nameResults.length) {
    searchErrorMsg(favoriteRecipesView);
  } else {
    nameResults.forEach((recipe) => {
      getRecipeBox(favoriteRecipesView, recipe);
    });
  }
}

function searchFavRecipeByTag(searchingFor) {
  event.preventDefault();
  let tagResultRecipes = [];
  currentUser.favoriteRecipes.forEach((recipe) => {
    let tagResult = recipe.tags.find((tag) => {
      return tag.toLowerCase() === searchingFor;
    });
    if(tagResult) {
        tagResultRecipes.push(recipe);
    }
  });
  
  showElement(favoriteRecipesView);
  clearView(favoriteRecipesView);
  if(!tagResultRecipes.length) {
    searchErrorMsg(favoriteRecipesView);
  } else {
    tagResultRecipes.forEach((recipe) => {
      getRecipeBox(favoriteRecipesView, recipe);
    });
  }
}

function searchRecipeByTag(searchingFor) {
  event.preventDefault();
  let tagResultRecipes = [];
  allRecipeStorage.recipes.forEach((recipe) => {
    let tagResult = recipe.tags.find((tag) => {
    return tag.toLowerCase() === searchingFor;
    });
    if(tagResult) {
      tagResultRecipes.push(recipe);
    }
  });

  showElement(searchResultsView);
  if(!tagResultRecipes.length) {
    searchErrorMsg(searchResultsView);
  } else {
    clearView(searchResultsView);
    tagResultRecipes.forEach((recipe) => {
      getRecipeBox(searchResultsView, recipe);
    });
  }
}
