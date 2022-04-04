export let allRecipeDataPromise = () => {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes').then(response => response.json());
}

export let allUsersPromise = () => {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users').then(response => response.json());
}

export let allIngredientsPromise = () => {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients').then(response => response.json());
}
