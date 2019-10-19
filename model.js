const Sequelize = require('sequelize');
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres';
const db = new Sequelize(databaseUrl);

const Movie = db.define('Movie',{
    title : Sequelize.STRING,
    yearOfRelease : Sequelize.INTEGER,
    synopsis : Sequelize.TEXT
})

const MovieList = [
    { title: "To Kill a Mockingbird", yearOfRelease : 2019, synopsis: "Harper Lee" },
    { title: "Harry Potter and the Sorcerer's Stone", yearOfRelease : 2018, synopsis: "J.K. Rowling" },
    { title: "Pride and Prejudice",yearOfRelease : 2017, synopsis: "Jane Austen" }
]


db
.sync({force: true})
//.then(() => Movie.truncate()) 
.then(() => Promise.all(MovieList.map(MovieList => Movie.create({
    title : MovieList.title,
    yearOfRelease : MovieList.yearOfRelease,
    synopsis : MovieList.synopsis
})
)))
    
module.exports = Movie