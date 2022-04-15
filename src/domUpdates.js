import loader from "sass-loader";

export function showElement(element) {
    element.classList.remove("hidden");
}
  
export function hideElement(element) {
    element.classList.add("hidden");
}

export function clearView(view) {
    view.innerHTML = "";
}

export function searchErrorMsg(view) {
    view.innerHTML = "<h3>Sorry, nothing found! Try another search.</h3>";
}

export function getRecipeBox(view, recipe) {
    view.innerHTML += `
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
        <table class='ingredient-list'id='class='ingredient-list'></table>
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
        </div>
        <h4>Cook Status</h4>
        <div class="to-cook-status" id=${currentRecipe.id}>
            <img class="to-cook-icon empty-to-cook" id=${currentRecipe.id} src="" alt="chef tools icon"/>
        </div>`;
    loadIngredientList(currentRecipe, allIngredientsData);
    instructionsList.innerHTML = '<h3>Instructions</h3>';
    currentRecipe.instructions.forEach((instruction) => {
        instructionsList.innerHTML += `
            <li>${instruction.instruction}</li>`
  });
}

function loadIngredientList(currentRecipe, allIngredientsData) {
    const ingredientList = document.querySelector("#ingredient-list");
    console.log(currentRecipe.getIngredientIds(allIngredientsData));
    ingredientList.innerHTML = "";
    ingredientList.innerHTML += `
        <tr>
            <td>
            </td>
        </tr>
    `;
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

export function viewTitle(view, name) {
    view.innerHTML = `<h3 class="page-title">Recipes for ${name} To Cook:</h3>`;
}