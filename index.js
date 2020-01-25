const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 1996

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome To our API jancok</h1>')
})

const { userRouter } = require('./router')

app.use('/user', userRouter)

app.listen(port, () => console.log('API aktif di port ' + port))

// const { db } = require('./database')

// db.query('SELECT * FROM user', (err, res) => {
//   console.log(res.rows[0])
// })

// const express = require('express');
// const { Client } = require('pg');
// const connectionString = 'postgres://postgres:nextindotid@nextin.id:5432/nextin';
// const client = new Client({
//     connectionString: connectionString
// });
// client.connect();
// var app = express();
// const port = process.env.PORT || 2001

// app.get('/', function (req, res, next) {
//     client.query('SELECT * FROM user', [1], function (err, result) {
//         if (err) {
//             console.log(err);
//             res.status(400).send(err);
//         }
//         console.log(result.rows)
//         res.status(200).send(result.rows);
//     });
// });



// const query = `SET search_path TO dunia_projek;`

// client.query('SELECT * FROM user;', [1], (err, res) => {
//     if (err) {
//       console.log('cok')
//     } else {
//       console.log(res.rows[0])
//     }
//   })


// app.listen(port, function () {
//     console.log('Server is running.. on Port ' + port);
// });





