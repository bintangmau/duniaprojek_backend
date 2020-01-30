const express = require('express')
const { userController } = require('../controller')

const router = express.Router()

router.post('/cekemail', userController.cekEmail)
router.post('/userregister', userController.userRegister)
router.post('/userregisterberkas', userController.userRegisterBerkas)
router.post('/userlogin', userController.userLogin)
router.get('/getdataprovince', userController.getDataProvince)
router.get('/getdatalanguage', userController.getDataLanguage)
router.get('/getdatacity/:id', userController.getDataCity)
router.get('/getdataindustry', userController.getDataIndustry)
router.get('/placeofbirth', userController.getPlaceofBirth)
router.post('/teskirimsms', userController.tesKirimSMS)
router.delete('/deleteregisterfailed/:email', userController.deleteRegisterFailed)
router.post('/sendemaillupapassword', userController.sendEmailLupaPassword)
router.post('/gantipassword', userController.gantiPassword)
router.get('/keeplogin/:inputUser', userController.keepLogin)

module.exports = router