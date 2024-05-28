const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        ingredients: { type: DataTypes.STRING, allowNull: false },
        instructions: { type: DataTypes.STRING, allowNull: false },
        imageUrl: { type: DataTypes.STRING, allowNull: false },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE },
    };

    const options = {
        timestamps: false
    };

    return sequelize.define('recipes', attributes, options);
}
