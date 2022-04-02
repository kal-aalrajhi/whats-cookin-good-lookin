import './styles.css';
import apiCalls from './apiCalls';
import { recipeData } from '../src/data/recipes';
import { ingredientsData } from '../src/data/ingredients';
import { RecipeRepository } from '../src/classes/RecipeRepository';
import './images/star.png';
import './images/empty-star.png';

// Global Variables
var allIngredientsData =  ingredientsData;
var allRecipeData = recipeData;
var allRecipeStorage = new RecipeRepository();
allRecipeStorage.addRecipes(allRecipeData);

// Query Selectors
var homeView = document.querySelector("#homeView");
var searchResultView = document.querySelector("#searchResultView");
var allRecipeView = document.querySelector("#allRecipeView");
var recipeDetailView = document.querySelector("#recipeDetailView")
var findByNameView = document.querySelector("#findByNameView");
var homeBtn = document.querySelector("#homeBtn");
var showAllRecipesBtn = document.querySelector("#allRecipesBtn");
var showFavoriteBtn = document.querySelector("#favoriteRecipesBtn");
var findNameBtn = document.querySelector("#findNameBtn");
var searchNameBtn = document.querySelector("#nameSearchBtn");
var searchNameInput = document.querySelector("#searchByNameInput");
var searchResultsView = document.querySelector("#searchResultsView");

var findTagBtn = document.querySelector("#findTagBtn");
var findByTagView = document.querySelector("#findByTagView");
var searchTagBtn = document.querySelector("#tagSearchBtn");
var searchTagInput = document.querySelector("#searchByTagInput");


// Event Listeners
showFavoriteBtn.addEventListener("click", loadFavoriteView);
showAllRecipesBtn.addEventListener("click", loadAllRecipesView);
homeBtn.addEventListener("click", loadHomeView);
searchResultsView.addEventListener("click", loadRecipeDetailView);
findNameBtn.addEventListener("click", loadNameSearchView);
findTagBtn.addEventListener("click", loadTagSearchView);
//findTagBtn.addEventListener("dlbclick", );
//searchResultView
allRecipeView.addEventListener("click", () => {
 loadRecipeDetailView();
 // changeStarIcon();
});

searchNameBtn.addEventListener("click", () => {
  var searchingForName = grabSearchValue("name");
  searchRecipeByName(searchingForName);
});

searchTagBtn.addEventListener("click", () => {
  var searchingForTag = grabSearchValue("tag");
  searchRecipeByTag(searchingForTag);
});

// Functions
function hideAllViews() {
  hideElement(homeView);
  hideElement(searchResultView);
  hideElement(allRecipeView);
  hideElement(findByNameView);
  hideElement(findByTagView);
  hideElement(recipeDetailView);
  hideElement(searchResultsView);
}

var showElement = (element) => {
  element.classList.remove("hidden");
}

var hideElement = (element) => {
  element.classList.add("hidden");
}

// function changeStarIcon() {
//    if (event.target.src !== './images/star.png') {
//        event.target.src = './images/star.png'
//   }
// }

function loadFavoriteView() {
  hideAllViews();
  showElement(favoriteRecipesBtn);
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

function grabSearchValue(byValue) { //add conditional to determine if serach by name or by tag
  if (byValue === "name") {
    return searchNameInput.value.toLowerCase();
  }
  return searchTagInput.value.toLowerCase();
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
        <img class='favorite-star' src='./images/empty-star.png'>
    </div>`
  });
}

function loadRecipeDetailView(event) {
  if(event.target.id !== 'searchResultView' && event.target.id !== 'allRecipeView' && event.target.id !== 'recipeDetailView') {
    hideAllViews();
    showElement(searchResultView);
    showElement(recipeDetailView);

    let currentRecipe = allRecipeStorage.filterById(event.target.id);
    var instructionList = []
    currentRecipe.instructions.forEach((instruction) => {
      instructionList.push(instruction.instruction);
    });

    recipeDetailView.innerHTML = `
    <div class='recipe-card'>
        <h3 class='recipe-name'>${currentRecipe.name}</h3>
        <h4>Ingredients</h4>
        <p>${currentRecipe.getIngredientNames(allIngredientsData)}</p>
        <h4>Instructions</h4>
        <p>${instructionList}</p>
        <h4>Total Cost</h4>
        <p>$${currentRecipe.getTotalCostInDollars(allIngredientsData)}</p>
    </div>`;
  }
}

function searchRecipeByName(searchingFor) {
  event.preventDefault();
  var nameResult = allRecipeStorage.recipes.find((recipe) => {
    return recipe.name.toLowerCase() === searchingFor;
  });

  showElement(searchResultsView);
  searchResultsView.innerHTML = `
  <div class='box recipe-box'>
      <img id=${nameResult.id} src=${nameResult.image} alt='${nameResult.name} image' />
      <h4 class='recipe-name'>${nameResult.name}</h4>
  </div>`
}

function searchRecipeByTag(searchingFor) {
  event.preventDefault();

  var tagResultRecipes = [];
  allRecipeStorage.recipes.forEach((recipe) => {
    var tagResult = recipe.tags.find((tag) => {
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
        <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image' />
        <h4 class='recipe-name'>${recipe.name}</h4>
        <h5 class='recipe-tags'>Tags: ${recipe.tags}</h5>
    </div>`
  });
}
