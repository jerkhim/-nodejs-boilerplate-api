const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { Op } = require('sequelize');
const db = require('_helpers/db');
const Role = require('_helpers/role');
app.use('/recipes', recipeRouter);
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(req, res, next) {
    try {
        const recipes = await db.Recipe.findAll();
        res.json(recipes);
    } catch (error) {
        next(error);
    }
}

async function getById(req, res, next) {
    try {
        const recipes = await getRecipe(req.params.id);
        if (!recipes) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(recipes);
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const recipe = await db.Recipe.create(req.body);
        res.status(201).json(recipes);
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const recipes = await getRecipe(req.params.id);
        if (!recipes) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        await recipes.update(req.body);
        res.json(recipes);
    } catch (error) {
        next(error);
    }
}

async function _delete(req, res, next) {
    try {
        const recipes = await getRecipe(req.params.id);
        if (!recipes) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        await recipes.destroy();
        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        next(error);
    }
}

async function getRecipe(id) {
    const recipes = await db.Recipe.findByPk(id);
    return recipes;
}