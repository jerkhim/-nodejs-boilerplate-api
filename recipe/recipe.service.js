const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Op } = require('sequelize');
const db = require('_helpers/db');
const Role = require('_helpers/role');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Recipe.findAll();
}

async function getById(id) {
    return await db.Recipe.findByPk(id);
}

async function create(params) {
    return await db.Recipe.create(params);
}

async function update(id, params) {
    const recipe = await getById(id);
    if (!recipe) throw 'Recipe not found';
    Object.assign(recipe, params);
    await recipe.save();
    return recipe;
}

async function _delete(id) {
    const recipe = await getById(id);
    if (!recipe) throw 'Recipe not found';
    await recipe.destroy();
}