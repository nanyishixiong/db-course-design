const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { addGrade, modifyGrade, queryGrade, deleteGrade } = require('../controller/grade.controller')


const router = new Router({ prefix: '/grade' })

router.post('/addGrade', auth, addGrade)
router.post('/modifyGrade', auth, modifyGrade)
router.post('/queryGrade', auth, queryGrade)
router.post('/deleteGrade', auth, deleteGrade)

module.exports = router