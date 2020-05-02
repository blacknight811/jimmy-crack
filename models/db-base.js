const { Sequelize, DataTypes, Model } = require('sequelize');
const dbConnection = require('../db-connection');

class Base extends Model {
    getAddress() {
        const streetCityState = [this.street, this.city, this.state].join(',');
        return [streetCityState, this.zip].join(' ');
      }
}

Base.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  geoLocation: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  }
}, {
  // Other model options go here
  sequelize: dbConnection, // We need to pass the connection instance
  modelName: 'Base', // We need to choose the model name
  indexes: [{ unique: true, fields: ['name'] }]
});

Base.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    return values;
  }

// the defined model is the class itself
console.log(Base === dbConnection.models.Base); // true

module.exports = Base;