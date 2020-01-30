const { db } = require('../database')
const { transporter } = require('../helper/mailer')
const crypto = require('crypto')
const Nexmo = require('nexmo')
const { uploader } = require('../helper/uploader')

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

        var sql2 = `INSERT INTO "user"(name, username, email, phone, password, type, industry) 
                    VALUES('${req.body.name}', '${req.body.username}', '${req.body.email}', '${req.body.phone}', '${req.body.password}', '${req.body.type}', '${req.body.industry}');`

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
                            <center>
                                <div class="container shadow divBesar">
                                    <h1>Verifikasi email anda </h1>
                                    <p>Klik tombol dibawah untuk verifikasi, lalu isi from di halaman yang kami sediakan <br/>Terima kasih atas perhatiannya</p>
                                    <a href="http://localhost:3000/emailverified/${req.body.email}" target="_blank">
                                        <button class="btn btn-primary link">Verifikasi email saya</button>
                                    </a>
                                </div>
                            </center>
                            `
                        };
                
                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err) {
                                return res.status(500).send(err)
                                // throw err;
                            } else {
                                res.status(200).send(results)
                            }
                        });
                    }
                })
            } 
        })    
    },
    deleteRegisterFailed: (req, res) => {
        var sql = `SET search_path TO dunia_projek;`

        var sql2 = `DELETE FROM "user" WHERE "name" = '${req.params.email}';`

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
    userRegisterBerkas: (req, res) => {
        const path = '/photos/user'
        const upload = uploader(path, 'USER').fields([{name: 'image'}])


        upload(req, res, (err) => {
            if(err) {
                return res.status(500).json({ message: 'Upload image failed !', error: err.message })
            }

            const { image } = req.files

            const data = JSON.parse(req.body.data)

            data.photo = `${path}/${image[0].filename}` 
            
            var sql = `SET search_path TO dunia_projek;`
    
            var sql2 = `UPDATE "user" 
                            SET "title" = '${data.title}', "province" = ${data.province}, "city" = ${data.city}, "gender" = '${data.gender}', 
                            "date_of_birth" = '${data.tanggalLahir}', "place_of_birth" = ${data.tempatLahir}, "about" = '${data.about}', "skill" = '${data.skill}',
                            "language" = '${data.language}', "status" = '${data.status}' , "photo" = '${data.photo}'
                        WHERE "email" = '${data.email}';` 
    
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
    },
    getDataProvince: (req, res) => {
        var sql = `SET search_path TO master_data;`

        var sql2 = `SELECT * FROM "province";`

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
    getDataLanguage: (req, res) => {
        var sql = `SET search_path TO master_data;`

        var sql2 = `SELECT * FROM "language";`

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
    getDataCity: (req, res) => {
        var sql = `SET search_path TO master_data;`

        var sql2 = `SELECT
                        * 
                    FROM
                        "master_data"."city" 
                    WHERE
                        SUBSTR( CAST ( "city"."id" AS VARCHAR ( 4 ) ), 1, 2 ) = '${req.params.id}'`

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
    getPlaceofBirth: (req, res) => {
        var sql = `SET search_path TO master_data;`

        var sql2 = `SELECT * FROM "city";`

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
    tesKirimSMS: (req, res) => {

        const nexmo = new Nexmo({
            apiKey: 'd93bbb3d',
            apiSecret: 'orVrRJ57ubpAl1mM'
          })

        const from = "BINTANG"
        const to = req.body.number
        const text = 'WOY KIRIM SMS BERHASIL BERHASIL HORE!'

        nexmo.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                if(responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        })
    },
    getDataIndustry: (req, res) => {
        var sql = `SET search_path TO master_data;`

        var sql2 = `SELECT * FROM "industry";`

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
    sendEmailLupaPassword: (req, res) => {
        var mailOptions = {
            from: 'Dunia-Projek <bintangmaulanahabib@gmail.com>',
            to: req.body.email,
            subject: 'Email Verification',
            html: `    
            <center>
                <div class="container shadow divBesar">
                    <h1>Verifikasi email anda </h1>
                    <p>Klik tombol dibawah untuk mengganti password anda</p>
                    <a href="http://localhost:3000/changepassword/${req.body.email}" target="_blank">
                        <button class="btn btn-primary link">Ganti Password</button>
                    </a>
                </div>
            </center>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).send(err)
                // throw err;
            } else {
                res.status(200).send(info)
            }
        });
    },
    gantiPassword: (req, res) => {
        req.body.password = crypto.createHmac('sha256', secret)
            .update(req.body.password)
            .digest('hex');

        var sql = `SET search_path TO dunia_projek;`

        var sql2 = `UPDATE "user" SET "password"= '${req.body.password}' WHERE email = '${req.body.email}';`

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
    keepLogin: (req, res) => {
        var sql = `SET search_path TO dunia_projek;`

        var sql2 = `SELECT * FROM "user" 
            WHERE "email" = '${req.params.inputUser}' 
            OR "username" = '${req.params.inputUser}';`

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