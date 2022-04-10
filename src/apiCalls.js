export const allRecipeDataPromise = () => {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes')
        .then(response => {
            if (!response.ok) {
                throw new Error(`status ${response.status} at URL: ${response.url}`);
            } else {
                return response;
            }
        })
        .then(response => response.json());
};

export const allUsersPromise = () => {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users')
        .then(response => {
            if (!response.ok) {
                throw new Error(`status ${response.status} at URL: ${response.url}`);
            } else {
                return response;
            }
        })
        .then(response => response.json());
};

export const allIngredientsPromise = () => {
    return fetch('https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients')
    .then(response => {
        if (!response.ok) {
            throw new Error(`status ${response.status} at URL: ${response.url}`);
        } else{
            return response;
        }
    })
    .then(response => response.json());
};
