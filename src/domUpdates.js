export function clearView(view) {
    view.innerHTML = "";
}

export function searchErrorMsg(view) {
    view.innerHTML = "<h3>Sorry, nothing found! Try another search.</h3>";
}

export function getRecipeBox(recipe) {
    return `
    <div class='box recipe-box'>
        <img id=${recipe.id} src=${recipe.image} alt='${recipe.name} image'/>
        <h4 class='recipe-name'>${recipe.name}</h4>
        <p class='recipe-tags'>Tags: ${recipe.tags}</p>
    </div>`
  }

