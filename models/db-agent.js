const { Sequelize, DataTypes, Model } = require('sequelize');
const dbConnection = require('../db-connection');
const User = require('./db-user');

class Agent extends User {
}

Agent.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  userId: {
      type: DataTypes.UUID,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  headline: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street2: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video: {
    type: DataTypes.STRING,
  }
}, {
  // Other model options go here
  sequelize: dbConnection, // We need to pass the connection instance
  modelName: 'Agent', // We need to choose the model name
  indexes: [{ unique: true, fields: ['userId'] }]
});

Agent.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
  }

// the defined model is the class itself
console.log(Agent === dbConnection.models.Agent); // true

module.exports = Agent;