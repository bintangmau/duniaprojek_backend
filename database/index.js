const { Pool } = require('pg')

const myDatabase = new Pool({
    user: 'postgres',
    host: 'nextin.id',
    database: 'nextin',
    password: 'nextindotid',
    port: 5432
  })

  module.exports = {
      db: myDatabase
  }