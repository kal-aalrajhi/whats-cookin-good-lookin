import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let showAllRecipesButton = document.querySelector('.nav-btn');
let homeView = document.querySelector('.home-view')

showAllRecipes.addEventListener("click", showAll() )

let show => (element) {
  element.classList.remove("hidden")

}

var hide => (element) {
  element.classList.add("hidden")
}

console.log('Hello world');
