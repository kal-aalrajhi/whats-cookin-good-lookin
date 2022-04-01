import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

var allRecipeView = document.querySelector("#allRecipeView");
var homeView = document.querySelector("#homeView");
var showAllRecipesButton = document.querySelector("#allRecipesBtn");
let findNameBtn = document.querySelector("#findNameBtn");
let findTagBtn = document.querySelector("#findTagBtn");
var homeBtn = document.querySelector("#homeBtn");


showAllRecipesButton.addEventListener("click", loadAllRecipesView);
// findNameButton.addEventListener("click", );
homeBtn.addEventListener("click", loadHomeView);
// findTagButton.addEventListener("click", );


function loadAllRecipesView() {
 hideAllViews();
 show(allRecipeView);
  allRecipeView.innerHTML = '';
  for(var i = 0; i < 4; i++) {

    allRecipeView.innerHTML +=
    `<div class="box recipe-box">
     <p> Cupcake </p>
    </div>`
  }
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
