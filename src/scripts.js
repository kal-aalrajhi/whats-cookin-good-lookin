import './styles.css';
import apiCalls from './apiCalls';
import { recipeData } from '../src/data/recipes';
import { ingredientsData } from '../src/data/ingredients';
import { usersData } from '../src/data/users';
import { RecipeRepository } from '../src/classes/RecipeRepository';
import { User } from '../src/classes/User';
import './images/star.png';
import './images/empty-star.png';
import './images/food-icon-light.png';

// Global Variables
var allIngredientsData =  ingredientsData;
var allRecipeData = recipeData;
var allRecipeStorage = new RecipeRepository();
var userRecipes = new User(usersData);
// allfavoriteRecipes.addFavoriteRecipe(allFavoriteData);

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
var favoriteRecipesView = document.querySelector("#favoriteRecipeView");
var instructionsList = document.querySelector("#instructionsList");
var recipeDetailCard = document.querySelector("#recipeDetailCard");

var findTagBtn = document.querySelector("#findTagBtn");
var findByTagView = document.querySelector("#findByTagView");
var searchTagBtn = document.querySelector("#tagSearchBtn");
var searchTagInput = document.querySelector("#searchByTagInput");

// Event Listeners
window.addEventListener('load', () => {
  // ON page load we must LOAD A RANDOM USER
  allRecipeStorage.addRecipes(allRecipeData);
});

showAllRecipesBtn.addEventListener("click", loadAllRecipesView);
homeBtn.addEventListener("click", loadHomeView);
searchResultsView.addEventListener("click", loadRecipeDetailView);
findNameBtn.addEventListener("click", loadNameSearchView);
findTagBtn.addEventListener("click", loadTagSearchView);

recipeDetailView.addEventListener("click", (event) => {
  if (event.target.classList.contains("star-icon")) {
    changeStarIcon(event)
  }
});

allRecipeView.addEventListener("click", (event) => {
 loadRecipeDetailView(event);
});

showFavoriteBtn.addEventListener("click", () => {
 loadFavoriteView();
 favoriteCurrentRecipe();
});


// function deleteRecipe(event) {
//   if(event.target.id !== 'searchResultView' && event.target.id !== 'allRecipeView' && event.target.id !== 'recipeDetailView') {
// favoriteRecipes.slice(event)

function changeStarIcon(event) {
  var emptyStar = document.querySelector(".empty-star");
  emptyStar.src = './images/star.png'
  var recipe = allRecipeData.find(recipe => {
     return recipe.id === Number(event.target.id)
   })
  var result = userRecipes.favoriteRecipes.find(recipe => {
      return recipe.id === Number(event.target.id)
   })
   if (!!result) {
   } else {
   userRecipes.favoriteRecipes.push(recipe)
 }
}

function favoriteCurrentRecipe() {
  hideAllViews();
  showElement(favoriteRecipeView);

   favoriteRecipesView.innerHTML = '';
  userRecipes.favoriteRecipes.forEach((recipe) => {
   favoriteRecipesView.innerHTML += `
   <div class='box recipe-box'>
       <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image' />
       <h4 class='recipe-name'>${recipe.name}</h4>
       <h5 class='recipe-tags'>Tags: ${recipe.tags}</h5>
   </div>`
 });
 console.log(userRecipes.favoriteRecipes)
}

// <div class='box recipe-box'>
//     <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image' />
//     <h4 class='recipe-name'>${recipe.name}</h4>
//     <h5 class='recipe-tags'>Tags: ${recipe.tags}</h5>
// </div>`
// });
// }

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
  hideElement(favoriteRecipeView);
}

var showElement = (element) => {
  element.classList.remove("hidden");
}

var hideElement = (element) => {
  element.classList.add("hidden");
}

function loadFavoriteView() {
  hideAllViews();
  showElement(favoriteRecipeView);
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

function grabSearchValue(byValue) { 
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
    </div>`
  });
}

function loadRecipeDetailView(event) {
  if(event.target.id !== 'searchResultView' && event.target.id !== 'allRecipeView' && event.target.id !== 'recipeDetailView') {
    hideAllViews();
    showElement(searchResultView);
    showElement(recipeDetailView);
   }
    let currentRecipe = allRecipeStorage.filterById(event.target.id);

    recipeDetailCard.innerHTML = `
      <h3 class='recipe-name'>${currentRecipe.name}</h3>
      <h4>Ingredients</h4>
      <p>${currentRecipe.getIngredientNames(allIngredientsData)}</p>
      <h4>Total Cost</h4>
      <p>$${currentRecipe.getTotalCostInDollars(allIngredientsData)}</p>
      <h4>Favorite</h4>
      <div class="favorite-star" id=${currentRecipe.id}>
        <img class="star-icon empty-star" id=${currentRecipe.id} src="./images/empty-star.png">
        <img class="star-icon full-star hidden" id=${currentRecipe.id} src="./images/star.png">
      </div>`;

    instructionsList.innerHTML = '<h3>Instructions</h3>';
    currentRecipe.instructions.forEach((instruction) => {
      instructionsList.innerHTML += `
        <li>${instruction.instruction}</li>
      `
    });
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
        <p class='recipe-tags'><strong>Tags:</strong> ${recipe.tags}</p>
    </div>`
  });
}
