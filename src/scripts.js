import './styles.css';
import apiCalls from './apiCalls';
import { recipeData } from '../src/data/recipes';
import { ingredientsData } from '../src/data/ingredients';
import { RecipeRepository } from '../src/classes/RecipeRepository';
import './images/turing-logo.png'; // An example of how you tell webpack to use an image (also need to link to it in the index.html)

// Global Variables
var allIngredientsData =  ingredientsData;
var allRecipeData = recipeData;
var allRecipeStorage = new RecipeRepository();
allRecipeStorage.addRecipes(allRecipeData);

// Query Selectors
var allRecipeView = document.querySelector("#allRecipeView");
var homeView = document.querySelector("#homeView");
var recipeDetailView = document.querySelector("#recipeDetailView")
var showAllRecipesButton = document.querySelector("#allRecipesBtn");
var homeBtn = document.querySelector("#homeBtn");
var searchResultView = document.querySelector("#searchResultView");
var findNameBtn = document.querySelector("#findNameBtn");
var findTagBtn = document.querySelector("#findTagBtn");
var searchNameInput = document.querySelector("#searchByNameInput");
var searchNameBtn = document.querySelector("#nameSearchBtn");
var searchTagBtn = document.querySelector("#tagSearchBtn");
var searchTagInput = document.querySelector("#searchByTagInput");


// Event Listeners
showAllRecipesButton.addEventListener("click", loadAllRecipesView);
homeBtn.addEventListener("click", loadHomeView);
searchResultView.addEventListener("click", loadRecipeDetailView);
findNameBtn.addEventListener("click", loadNameSearchView);
findTagBtn.addEventListener("click", loadTagSearchView);

searchNameBtn.addEventListener("click", () => {
  event.preventDefault();
  var searchingForName = grabSearchValue();
  searchRecipeByName(searchingForName);
});

searchTagBtn.addEventListener("click", () => {
  event.preventDefault();
  var searchingForTag = grabSearchValue();
  searchRecipeByTag(searchingForTag);
});

// Functions
function loadNameSearchView() {
  hideAllViews();
  showElement(findByNameView);
}

function loadTagSearchView() {
  hideAllViews();
  showElement(findByTagView);
}

function grabSearchValue() { //add conditional to determine if serach by name or by tag
  return searchNameInput.value.toLowerCase();
}

function searchRecipeByName(searchingFor) {
  var nameResult = allRecipeStorage.recipes.find((recipe) => {
    return recipe.name.toLowerCase() === searchingFor
  });

  searchResultView.innerHTML = `
  <div class='box recipe-box'>
      <img id=${nameResult.id} src=${nameResult.image} alt='${nameResult.name} image' />
      <h4 class='recipe-name'>${nameResult.name}</h4>
  </div>`
}

function searchRecipeByTag(searchingFor) {
  var tagResult = allRecipeStorage.recipes.find((recipe) => {
    return recipe.name.toLowerCase() === searchingFor
  });
  console.log(tagResult);

  searchResultView.innerHTML = `
  <div class='box recipe-box'>
      <img id=${nameResult.id} src=${nameResult.image} alt='${nameResult.name} image' />
      <h4 class='recipe-name'>${nameResult.name}</h4>
  </div>`
}

function loadHomeView() {
  hideAllViews();
  showElement(homeView);
}

function loadAllRecipesView() {
 hideAllViews();
 showElement(allRecipeView);
 allRecipeView.innerHTML = '';

 allRecipeStorage.recipes.forEach((recipe) => {
    allRecipeView.innerHTML += `
    <div class='box recipe-box'>
        <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image' />
        <h4 class='recipe-name'>${recipe.name}</h4>
    </div>`
  });
}

function loadRecipeDetailView(event) {
    if(event.target.id !== 'searchResultView' && event.target.id !== 'allRecipeView' && event.target.id !== 'recipeDetailView') {
        hideAllViews();
        showElement(recipeDetailView);

        let currentRecipe = allRecipeStorage.filterById(event.target.id);

        var instructionList = []
        currentRecipe.instructions.forEach((instruction) => {
          instructionList.push(instruction.instruction)

        })
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

function hideAllViews() {
  hideElement(allRecipeView);
  hideElement(findByNameView);
  hideElement(findByTagView);
  hideElement(homeView);
  hideElement(recipeDetailView);
}

var showElement = (element) => {
  element.classList.remove("hidden");
}

var hideElement = (element) => {
  element.classList.add("hidden");
}
