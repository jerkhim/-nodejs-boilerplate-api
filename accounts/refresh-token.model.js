const { DataTypes } = require('sequelized');

module.exports = model;

function model(sequelized){
    const attributes = {
        token: {type: DataTypes.STRING},
        expires: {type: DataTypes.DATE},
        created: {type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
        createdByIp: {type: DataTypes.STRING},
        revoked: {type: DataTypes.DATE},
        revokedByIp: {type: DataTypes.STRING},
        replaceByToken: {type: DataTypes.STRING},
        isExpired: {
            type: DataTypes.VIRTUAL,
            get() { return !this.revoked && !this.isExpired;}
        }
    };
    const options = {
        timestamps: false
    };
    return sequelize.define('refreshToken', attributes, options);
}