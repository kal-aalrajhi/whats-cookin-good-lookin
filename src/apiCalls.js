// Your fetch requests will live here!
// console.log('I will be a fetch request!');


export let allRecipeDataPromise = () => {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes').then(response => response.json());
}

export let allUsersPromise = () => {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users').then(response => response.json());
}

export let allIngredientsPromise = () => {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients').then(response => response.json());
}

// Promise.all([allRecipeData, usersData, allIngredientsData ]).then(dataValues);

 // Nope 2
// export const recipesPromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
//   .then(response => response.json())
//   .then(data => {
//     allRecipeData = data.recipeData;
//     allRecipeStorage.addRecipes(allRecipeData)
//   });

// export const usersPromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
//     .then(response => response.json())
//     .then(data => {
//       usersData = data.usersData;
//       const randomIndex = Math.floor(Math.random() * usersData.length)
//       currentUser = new User(usersData[randomIndex]);
//     });

// export const ingredientsPromise = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
//     .then(response => response.json())
//     .then(data => {
//       allIngredientsData = data.ingredientsData;
//     });

    // Nope 1
// var recipeDataSet = fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
//     .then(response => response.json())
//     .then(data => {
//     allRecipeData = data.recipeData;
//     allRecipeStorage.addRecipes(allRecipeData)
//     });

//     export {recipeDataSet}

//     fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
//     .then(response => response.json())
//     .then(data => {
//     usersData = data.usersData;
//     const randomIndex = Math.floor(Math.random() * usersData.length)
//     currentUser = new User(usersData[randomIndex]);
//     });

    // fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
    // .then(response => response.json())
    // .then(data => {
    // allIngredientsData = data.ingredientsData;
    // });