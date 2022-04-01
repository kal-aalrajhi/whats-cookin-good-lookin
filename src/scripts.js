import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


var homeView = document.querySelector("#homeView");
var showAllRecipesButton = document.querySelector("#allRecipesBtn");
let findNameButton = document.querySelector("#findNameBtn");
let findTagButton = document.querySelector("#findTagBtn");
var homeBtn = document.querySelector("#homeBtn");


showAllRecipesButton.addEventListener("click", loadAllRecipesView)
findNameButton.addEventListener("click", )
homeBtn.addEventListener("click", homeView)
findTagButton.addEventListener("click", )


function loadAllRecipesView() {
 hideElement(homeView)
 show(allRecipeView)
}

function homeView() {
  hideElement(allRecipeView)
  hideElement(findByNameView)
  hideElement(findByTagView)
}

var show => (element) {
  element.classList.remove("hidden")
}

var hideElement = (element) => {
  element.classList.add("hidden")
}
