import './styles.css';
import apiCalls from './apiCalls';
import { recipeData } from '../src/data/recipes';
import { RecipeRepository } from '../src/classes/RecipeRepository';
import './images/turing-logo.png'; // An example of how you tell webpack to use an image (also need to link to it in the index.html)

// Global Variables
var allRecipeData = recipeData;
var allRecipeStorage = new RecipeRepository(allRecipeData);

// Query Selectors
var allRecipeView = document.querySelector("#allRecipeView");
var homeView = document.querySelector("#homeView");
var recipeDetailView = document.querySelector("#recipeDetailView")
var showAllRecipesButton = document.querySelector("#allRecipesBtn");
var homeBtn = document.querySelector("#homeBtn");
var searchResultView = document.querySelector("#searchResultView"); 
// var findNameBtn = document.querySelector("#findNameBtn");
// var findTagBtn = document.querySelector("#findTagBtn");


// Event Listeners
showAllRecipesButton.addEventListener("click", loadAllRecipesView);
homeBtn.addEventListener("click", loadHomeView);
searchResultView.addEventListener("click", loadRecipeDetailView);
// findNameButton.addEventListener("click", );
// findTagButton.addEventListener("click", );

// Functions
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
    if(event.target.id !== 'searchResultView') {
        console.log("recipe ID is: ", event.target.id);
        hideAllViews();
        showElement(recipeDetailView);
        recipeDetailView.innerHTML = `
        <div class='recipe-card'>
            <h3 class='recipe-name'>Recipe Name</h3>
            <h4>Ingredients</h4>
            <p>ingredients list</p>
            <h4>Instructions</h4>
            <p>instructions list</p>
            <h4>Total Cost</h4>
            <p>$cost</p>
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
