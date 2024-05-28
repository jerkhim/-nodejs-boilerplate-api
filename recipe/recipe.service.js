const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    const recipes = await db.Recipe.findAll();
    return recipes.map(x => basicDetails(x));
}

async function getById(id) {
    const recipe = await getRecipe(id);
    return basicDetails(recipe);
}

async function create(params) {
    const recipe = new db.Recipe(params);
    recipe.created = Date.now()

    // save account
    await recipe.save();

    return basicDetails(recipe);
}

async function update(id, params) {
    const recipe = await getRecipe(id);

    // copy params to account and save
    Object.assign(recipe, params);
    recipe.updated = Date.now();
    await recipe.save();

    return basicDetails(recipe);
}

async function _delete(id) {
    const recipe = await getRecipe(id);
    await recipe.destroy();
}

// helper functions

async function getRecipe(id) {
    const recipe = await db.Recipe.findByPk(id);
    if (!recipe) throw 'Recipe not found';
    return recipe;
}

function basicDetails(recipe) {
    const { id, name, description, ingredients, instructions, imageUrl, created, updated } = recipe;
    return { id, name, description, ingredients, instructions, imageUrl, created, updated };
}