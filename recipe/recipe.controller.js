const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const Role = require('_helpers/role');
const recipeService = require('recipe/recipe.service'); 

// routes

router.get('/', authorize(Role.Admin), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(Role.Admin), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function getAll(req, res, next) {
    recipeService.getAll()
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getById(req, res, next) {
    // Users can get any recipe
    recipeService.getById(req.params.id)
        .then(recipe => recipe ? res.json(recipe) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().required(),
        ingredients: Joi.string().required(),
        description: Joi.string().required(),
        amount: Joi.string().min(10).required(),
        image: Joi.string().uri().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    // Only admins can create recipes
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    recipeService.create(req.body)
        .then(recipe => res.json(recipe))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schemaRules = {
        title: Joi.string().empty(''),
        ingredients: Joi.string().empty(''),
        description: Joi.string().empty(''),
        amount: Joi.string().empty(''),
        image: Joi.string().uri().empty('')
    };

    const schema = Joi.object(schemaRules);
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    // Only admins can update recipes
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    recipeService.update(req.params.id, req.body)
        .then(recipe => res.json(recipe))
        .catch(next);
}

function _delete(req, res, next) {
    // Only admins can delete recipes
    if (req.user.role !== Role.Admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    recipeService.delete(req.params.id)
        .then(() => res.json({ message: 'Recipe deleted successfully' }))
        .catch(next);
}