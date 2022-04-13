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

export function recipeDetails(view, currentRecipe, instructionsList, allIngredientsData) {
    view.innerHTML = `
        <h3 class='recipe-name'>${currentRecipe.name}</h3>
        <h4>Ingredients</h4>
        <p>${currentRecipe.getIngredientNames(allIngredientsData)}</p>
        <h4>Total Cost</h4>
        <p>$${currentRecipe.getTotalCostInDollars(allIngredientsData)}</p>
        <h4>Favorite</h4>
        <div class="favorite-star" id=${currentRecipe.id}>
        <img class="star-icon empty-star" id=${currentRecipe.id} src="" alt="star icon"/>
        </div>
        <h4>To Cook</h4>
        <div class="to-cook-tool" id=${currentRecipe.id}>
        <img class="to-cook-icon empty-to-cook" id=${currentRecipe.id} src="" alt="chef tools icon"/>
        </div>`;
    instructionsList.innerHTML = '<h3>Instructions</h3>';
    currentRecipe.instructions.forEach((instruction) => {
        instructionsList.innerHTML += `
            <li>${instruction.instruction}</li>`
  });
}

export function iconToFull(iconName) {
    let icon = document.querySelector(`.${iconName}-icon`);
    icon.src = `./images/full-${iconName}.png`;
    icon.classList.remove(`empty-${iconName}`);
    icon.classList.add(`full-${iconName}`);
}
  
  export function iconToEmpty(iconName) {
    let icon = document.querySelector(`.${iconName}-icon`);
    icon.src = `./images/empty-${iconName}.png`;
    icon.classList.remove(`full-${iconName}`);
    icon.classList.add(`empty-${iconName}`);
}