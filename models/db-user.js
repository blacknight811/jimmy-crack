const { Sequelize, DataTypes, Model } = require('sequelize');
const dbConnection = require('../db-connection');

class User extends Model {
    getFullname() {
        return [this.firstname, this.lastname].join(' ');
      }
}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {isEmail: true}
  },
  image: {
    type: DataTypes.STRING,
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role: {
    type: DataTypes.STRING,
  }
}, {
  // Other model options go here
  sequelize: dbConnection, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  indexes: [{ unique: true, fields: ['email'] }]
});

User.prototype.toJSON =  function () {
    var values = Object.assign({}, this.get());
  
    delete values.password;
    return values;
  }

// the defined model is the class itself
console.log(User === dbConnection.models.User); // true

module.exports = User;