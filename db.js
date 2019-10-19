const Sequelize = require('sequelize')
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres';
const db = new Sequelize(databaseUrl);
const Movie = require('./model')

db
.sync()
.then(() => console.log('Database schema updated'))
.catch(console.error)

module.exports = db;

