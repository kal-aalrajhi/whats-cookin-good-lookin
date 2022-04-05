import './styles.css';
import apiCalls from './apiCalls';
import { RecipeRepository } from '../src/classes/RecipeRepository';
import { User } from './classes/User';
import { Recipe } from '../src/classes/Recipe';
import './images/apple-pie-home.jpg';
import './images/food-icon-light.png';
import './images/full-star.png';
import './images/empty-star.png';
import './images/full-to-cook.png';
import './images/empty-to-cook.png';
import { allRecipeDataPromise } from './apiCalls';
import { allUsersPromise } from './apiCalls';
import { allIngredientsPromise } from './apiCalls';

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
window.addEventListener('load', () => {
  allRecipeDataPromise().then(data => {
    allRecipeData = data.recipeData;
    allRecipeStorage.addRecipes(allRecipeData)
  });

  allUsersPromise().then(data => {
    usersData = data.usersData;
    const randomIndex = Math.floor(Math.random() * usersData.length)
    currentUser = new User(usersData[randomIndex]);
  });

  allIngredientsPromise().then(data => {
    allIngredientsData = data.ingredientsData;
  });
});

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
});

searchTagBtn.addEventListener("click", () => {
  let searchingForTag = grabSearchValue("tag");
  searchRecipeByTag(searchingForTag);
});

searchFavNameBtn.addEventListener("click", () => {
  let searchingForFavName = grabSearchValue("favorite name");
  searchFavRecipeByName(searchingForFavName);
});

searchFavTagBtn.addEventListener("click", () => {
  let searchingForFavTag = grabSearchValue("favorite tag");
  searchFavRecipeByTag(searchingForFavTag);
});

// Functions
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

const showElement = (element) => {
  element.classList.remove("hidden");
}

const hideElement = (element) => {
  element.classList.add("hidden");
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

function iconToFull(iconName) {
  let icon = document.querySelector(`.${iconName}-icon`);
  icon.src = `./images/full-${iconName}.png`;
  icon.classList.remove(`empty-${iconName}`);
  icon.classList.add(`full-${iconName}`);
}

function iconToEmpty(iconName) {
  let icon = document.querySelector(`.${iconName}-icon`);
  icon.src = `./images/empty-${iconName}.png`;
  icon.classList.remove(`full-${iconName}`);
  icon.classList.add(`empty-${iconName}`);
}

function addFavoriteRecipe(event) {
  iconToFull('star');
  let recipeToAdd = allRecipeData.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  recipeToAdd = new Recipe(recipeToAdd);
  recipeToAdd.favorite = true;
  let result = currentUser.favoriteRecipes.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  if (!result) {
    currentUser.addFavoriteRecipe(recipeToAdd);
  }
}

function removeFavoriteRecipe(event) {
  iconToEmpty('star');
  let recipeToRemove = allRecipeData.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  recipeToRemove.favorite = false;
  let recipeIdx;
  let result = currentUser.favoriteRecipes.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  if (result) {
    let recipeIdx = currentUser.favoriteRecipes.indexOf(result);
    currentUser.favoriteRecipes.splice(recipeIdx, 1);
  }
}

function favoriteCurrentRecipe() {
  favoriteRecipesView.innerHTML = '';
  currentUser.favoriteRecipes.forEach((recipe) => {
    favoriteRecipesView.innerHTML += `
      <div class='box recipe-box'>
          <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image' />
          <h4 class='recipe-name'>${recipe.name}</h4>
          <h5 class='recipe-tags'>Tags: ${recipe.tags}</h5>
      </div>`
  });
}

function addToCookRecipe(event) {
  iconToFull('to-cook');
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
  toCookView.innerHTML = '<h3 class="page-title">Recipes To Cook:</h3>';
  currentUser.recipesToCook.forEach((recipe) => {
  toCookView.innerHTML += `
    <div class='box recipe-box'>
      <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image' />
      <h4 class='recipe-name'>${recipe.name}</h4>
      <h5 class='recipe-tags'>Tags: ${recipe.tags}</h5>
    </div>`
  });
}

function removeToCookRecipe(event) {
  iconToEmpty('to-cook');
  let recipeToRemove = allRecipeData.find(recipe => {
    return recipe.id === Number(event.target.id)
  });
  recipeToRemove.favorite = false;
  let recipeIdx;
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

  allRecipeView.innerHTML = '';
  allRecipeStorage.recipes.forEach((recipe) => {
    allRecipeView.innerHTML += `
      <div class='box recipe-box'>
        <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image' />
        <h4 class='recipe-name'>${recipe.name}</h4>
        <h5 class='recipe-tags'>Tags: ${recipe.tags}</h5>
      </div>`
  });
}

function loadRecipeDetailView(event) {
  if (event.target.id !== 'searchResultView' && event.target.id !== 'allRecipeView' && event.target.id !== 'recipeDetailView') {
    hideAllViews();
    showElement(searchResultView);
    showElement(recipeDetailView);
  }
  let currentRecipe = "";
   
  if (event.target.id) {
    currentRecipe = allRecipeStorage.filterById(event.target.id);
    recipeDetailCard.innerHTML = `
      <h3 class='recipe-name'>${currentRecipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${currentRecipe.getIngredientNames(allIngredientsData)}</p>
      <h4>Total Cost</h4>
      <p>$${currentRecipe.getTotalCostInDollars(allIngredientsData)}</p>
      <h4>Favorite</h4>
      <div class="favorite-star" id=${currentRecipe.id}>
        <img class="star-icon empty-star" id=${currentRecipe.id} src="./images/empty-star.png" alt="star icon"/>
      </div>
      <h4>To Cook</h4>
      <div class="to-cook-tool" id=${currentRecipe.id}>
        <img class="to-cook-icon empty-to-cook" id=${currentRecipe.id} src="./images/empty-to-cook.png" alt="chef tools icon"/>
      </div>`;
    instructionsList.innerHTML = '<h3>Instructions</h3>';
    currentRecipe.instructions.forEach((instruction) => {
      instructionsList.innerHTML += `
        <li>${instruction.instruction}</li>`
    });
  }
}

function searchRecipeByName(searchingFor) {
  event.preventDefault();
  let nameResult = allRecipeStorage.recipes.find((recipe) => {
    return recipe.name.toLowerCase() === searchingFor;
  });
  showElement(searchResultsView);
  searchResultsView.innerHTML = `
    <div class='box recipe-box'>
        <img id=${nameResult.id} src=${nameResult.image} alt='${nameResult.name} image'/>
        <h4 class='recipe-name'>${nameResult.name}</h4>
        <p class='recipe-tags'>Tags: ${nameResult.tags}</p>
    </div>`
}

function searchFavRecipeByName(searchingFor) {
  event.preventDefault();
  let nameResult = currentUser.favoriteRecipes.find((recipe) => {
    return recipe.name.toLowerCase() === searchingFor;
  });
  showElement(favoriteRecipesView);
  favoriteRecipesView.innerHTML = `
    <div class='box recipe-box'>
      <img id=${nameResult.id} src=${nameResult.image} alt='${nameResult.name} image'/>
      <h4 class='recipe-name'>${nameResult.name}</h4>
      <p class='recipe-tags'>Tags: ${nameResult.tags}</p>
    </div>`
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
  favoriteRecipesView.innerHTML = '';
  tagResultRecipes.forEach((recipe) => {
  favoriteRecipesView.innerHTML += `
    <div class='box recipe-box'>
      <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image'/>
      <h4 class='recipe-name'>${recipe.name}</h4>
      <p class='recipe-tags'><strong>Tags:</strong> ${recipe.tags}</p>
    </div>`
 });
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
  searchResultsView.innerHTML = '';
  tagResultRecipes.forEach((recipe) => {
    searchResultsView.innerHTML += `
      <div class='box recipe-box'>
        <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image'/>
        <h4 class='recipe-name'>${recipe.name}</h4>
        <p class='recipe-tags'><strong>Tags:</strong> ${recipe.tags}</p>
      </div>`
  });
}
