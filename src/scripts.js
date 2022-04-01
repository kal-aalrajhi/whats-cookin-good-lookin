import './styles.css';
import apiCalls from './apiCalls';
import { recipesSampleData } from '../src/data/recipes-sample-data';
import { RecipeRepository } from '../src/classes/RecipeRepository';
import './images/turing-logo.png'; // An example of how you tell webpack to use an image (also need to link to it in the index.html)

// Global Variables
var recipeData = recipesSampleData;
var allRecipeStorage = new RecipeRepository(recipeData);

// Query Selectors
var allRecipeView = document.querySelector("#allRecipeView");
var homeView = document.querySelector("#homeView");
var showAllRecipesButton = document.querySelector("#allRecipesBtn");
// var findNameBtn = document.querySelector("#findNameBtn");
// var findTagBtn = document.querySelector("#findTagBtn");
var homeBtn = document.querySelector("#homeBtn");

// Event Listeners
showAllRecipesButton.addEventListener("click", loadAllRecipesView);
// findNameButton.addEventListener("click", );
homeBtn.addEventListener("click", loadHomeView);
// findTagButton.addEventListener("click", );

// Functions
function loadAllRecipesView() {
 hideAllViews();
 show(allRecipeView);
 allRecipeView.innerHTML = '';

 allRecipeStorage.recipes.forEach((recipe) => {
    allRecipeView.innerHTML += `
    <div class='box recipe-box'>
        <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image' />
        <p class='recipe-name'>${recipe.name}</p>
    </div>`
  });
}

function loadHomeView() {
  hideAllViews();
  show(homeView);
}

function hideAllViews() {
  hideElement(allRecipeView);
  hideElement(findByNameView);
  hideElement(findByTagView);
  hideElement(homeView);
}

var show = (element) => {
  element.classList.remove("hidden");
}

var hideElement = (element) => {
  element.classList.add("hidden");
}
