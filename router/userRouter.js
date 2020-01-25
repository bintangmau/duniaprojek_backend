const express = require('express')
const { userController } = require('../controller')

const router = express.Router()

router.post('/cekemail', userController.cekEmail)
router.post('/userregister', userController.userRegister)
router.post('/userregisterberkas', userController.userRegisterBerkas)
router.post('/userlogin', userController.userLogin)

module.exports = router