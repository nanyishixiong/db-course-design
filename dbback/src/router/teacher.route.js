const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { addTeacher, modifyTeacher, queryTeacher, deleteTeacher } = require('../controller/Teacher.controller')


const router = new Router({ prefix: '/teacher' })

router.post('/addTeacher', auth, addTeacher)
router.post('/modifyTeacher', auth, modifyTeacher)
router.post('/queryTeacher', auth, queryTeacher)
router.post('/deleteTeacher', auth, deleteTeacher)

module.exports = router