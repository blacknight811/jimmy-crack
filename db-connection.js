const Sequelize = require('sequelize');

require('dotenv').config()


// database setup
const connection = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  });
  
const connectToDb = async () => {
  try {
    await connection.authenticate();
    await connection.sync({logging: console.log})
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
  
connectToDb();

module.exports = connection;