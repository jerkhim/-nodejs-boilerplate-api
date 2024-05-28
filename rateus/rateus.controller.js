const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const recipeService = require('./recipe.service');
const recipeController = require('./recipe.controller');
app.use('/recipes', recipeRouter);
// routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.delete('/:id', _delete);

module.exports = router;

function getAll(req, res, next) {
    recipeService.getAll()
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getById(req, res, next) {
    recipeService.getById(req.params.id)
        .then(recipes => recipe ? res.json(recipes) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        ingredients: Joi.string().required(),
        instructions: Joi.string().required(),
        imageUrl: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    recipeService.create(req.body)
        .then(recipes => res.json(recipes))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        description: Joi.string().empty(''),
        ingredients: Joi.string().empty(''),
        instructions: Joi.string().empty(''),
        imageUrl: Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    recipeService.update(req.params.id, req.body)
        .then(recipes => res.json(recipes))
        .catch(next);
}

function _delete(req, res, next) {
    recipeService.delete(req.params.id)
        .then(() => res.json({ message: 'Recipe deleted successfully' }))
        .catch(next);
}
