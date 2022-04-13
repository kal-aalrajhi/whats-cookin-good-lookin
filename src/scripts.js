import './styles.css';
// import apiCalls from './apiCalls';
import { fetchResponse } from './apiCalls';
// domUpdates can I import all functions on one line??
import { getRecipeBox } from './domUpdates';
import { searchErrorMsg } from './domUpdates';
import { clearView } from './domUpdates';
import { recipeDetails} from './domUpdates';
import { iconToFull } from './domUpdates';
import { iconToEmpty } from './domUpdates';
import { showElement } from './domUpdates';
import { hideElement } from './domUpdates';
import { viewTitle } from './domUpdates';

import { RecipeRepository } from '../src/classes/RecipeRepository';
import { User } from './classes/User';
import { Recipe } from '../src/classes/Recipe';
import './images/apple-pie-home.jpg';
import './images/food-icon-light.png';
import './images/full-star.png';
import './images/empty-star.png';
import './images/full-to-cook.png';
import './images/empty-to-cook.png';

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
const searchFavBarsView = document.querySelector("#favSearchBar");
const findByTagView = document.querySelector("#findByTagView");
const recipeDetailCard = document.querySelector("#recipeDetailCard");
const instructionsList = document.querySelector("#instructionsList");

const homeBtnIcon = document.querySelector("#homeBtnIcon");
const homeBtn = document.querySelector("#homeBtn");
const showAllRecipesBtn = document.querySelector("#allRecipesBtn");
const showFavoriteBtn = document.querySelector("#favoriteRecipesBtn");
const findNameBtn = document.querySelector("#findNameBtn");
const findTagBtn = document.querySelector("#findTagBtn");
const toCookBtn = document.querySelector("#toCookBtn");
const searchNameBtn = document.querySelector("#nameSearchBtn");
const searchTagBtn = document.querySelector("#tagSearchBtn");
const searchFavNameBtn = document.querySelector("#favNameSearchBtn");
const searchFavTagBtn = document.querySelector("#favTagSearchBtn");
const searchNameInput = document.querySelector("#searchByNameInput");
const searchTagInput = document.querySelector("#searchByTagInput");
const searchFavNameInput = document.querySelector("#favSearchByNameInput");
const searchFavTagInput = document.querySelector("#favSearchByTagInput");

// Event Listeners
window.addEventListener("load", loadData);

showAllRecipesBtn.addEventListener("click", loadAllRecipesView);
findNameBtn.addEventListener("click", loadNameSearchView);
findTagBtn.addEventListener("click", loadTagSearchView);
showFavoriteBtn.addEventListener("click", loadFavoriteView);
homeBtn.addEventListener("click", loadHomeView);
homeBtnIcon.addEventListener("click", loadHomeView);
toCookBtn.addEventListener("click", loadToCookView);
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

// Functions
function loadData() {
  const fetchRecipes = fetchResponse("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes");
  const fetchUsers = fetchResponse("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users");
  const fetchIngredients = fetchResponse("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients");

  Promise.all([fetchRecipes, fetchUsers, fetchIngredients]).then((data) => {
    allRecipeData = data[0].recipeData;
    allRecipeStorage.addRecipes(allRecipeData);

    usersData = data[1].usersData;
    const randomIndex = Math.floor(Math.random() * usersData.length)
    currentUser = new User(usersData[randomIndex]);

    allIngredientsData = data[2].ingredientsData;
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
  showElement(searchResultView);
  showElement(toCookView);
  toCookCurrentRecipe();
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
  viewTitle(toCookView, currentUser.name);
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

    recipeDetails(recipeDetailCard, currentRecipe, instructionsList, allIngredientsData);
    
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
