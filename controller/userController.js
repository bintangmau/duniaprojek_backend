const { db } = require('../database')
const { transporter } = require('../helper/mailer')
const crypto = require('crypto')

const secret = 'duniaprojek'

module.exports = {
    cekEmail: (req, res) => {
        var sql = `SET search_path TO dunia_projek;`

       var sql2 = `SELECT * FROM "user" WHERE "email" = '${req.body.email}' OR "username" = '${req.body.username}';`

       db.query(sql, (err, results) => {
           if(err) {
            return res.status(500).send(err)
           } else {
               db.query(sql2, (err, results2) => {
                    if(err) {
                        return res.status(500).send(err)
                    } 
                   return res.status(200).send(results2)
               })
           }
       })
   },
    userRegister: (req, res) => {
        req.body.password = crypto.createHmac('sha256', secret)
                            .update(req.body.password)
                            .digest('hex');

        var sql = `SET search_path TO dunia_projek;`

        var sql2 = `INSERT INTO "user"(name, username, email, phone, password, type) 
                    VALUES('${req.body.name}', '${req.body.username}', '${req.body.email}', '${req.body.phone}', '${req.body.password}', '${req.body.type}');`

        db.query(sql, (err, results) => {
            if(err) {
                console.log('erorbgst')
                return res.status(500).send(err)
            } else {
                db.query(sql2, (err, results2) => {
                    if(err) {
                        console.log(err)
                        return res.status(500).send(err)
                    } else {
                        var mailOptions = {
                            from: 'Dunia-Projek <bintangmaulanahabib@gmail.com>',
                            to: req.body.email,
                            subject: 'Email Verification',
                            html: `
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                                <title>Document</title>
                            </head>
                            <body>
                            <center>
                                <h1>Email Verifikasi ${req.body.name} </h1>
                                <a href="http://localhost:3000/emailverified/${req.body.email} " target="_blank">
                                    <button>Klik</button>
                                </a>
                            </center>
                                
                            </body>
                            `
                        };
                
                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err) {
                                throw err;
                            } else {
                                console.log(results2.rows[0]);
                                res.status(200).send(results)
                            }
                        });
                    }
                })
            } 
        })    
    },
    userRegisterBerkas: (req, res) => {
        var sql = `SET search_path TO dunia_projek;`

        var sql2 = `UPDATE "user" 
                        SET "title" = '${req.body.title}', "province" = ${req.body.province}, "city" = ${req.body.city}, "gender" = '${req.body.gender}', 
                        "date_of_birth" = '${req.body.tanggalLahir}', "place_of_birth" = ${req.body.tempatLahir}, "about" = '${req.body.about}', "skill" = '${req.body.skill}',
                        "language" = '${req.body.language}', "status" = '${req.body.status}' 
                    WHERE "email" = '${req.body.email}';` 

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            } else {
                db.query(sql2, (err, results2) => {
                        if(err) {
                            console.log(err)
                            return res.status(500).send(err)
                        } 
                    return res.status(200).send(results2)
                })
            }
        })
    },
    userLogin: (req, res) => {
        req.body.password = crypto.createHmac('sha256', secret)
                            .update(req.body.password)
                            .digest('hex');

        var sql = `SET search_path TO dunia_projek;`

        var sql2 = `SELECT * FROM "user" 
        WHERE "email" = '${req.body.inputFromUser}' 
        OR "username" = '${req.body.inputFromUser}' 
        AND "password" = '${req.body.password}';
        `

        db.query(sql, (err, results) => {
            if(err) {
                return res.status(500).send(err)
            } else {
                db.query(sql2, (err, results2) => {
                        if(err) {
                            console.log(err)
                            return res.status(500).send(err)
                        } 
                    return res.status(200).send(results2)
                })
            }
        })
    }
}