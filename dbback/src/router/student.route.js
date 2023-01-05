const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { addStudent, modifyStudent, queryStudent, deleteStudent } = require('../controller/student.controller')


const router = new Router({ prefix: '/student' })

router.post('/addStudent', auth, addStudent)
router.post('/modifyStudent', auth, modifyStudent)
router.post('/queryStudent', auth, queryStudent)
router.post('/deleteStudent', auth, deleteStudent)

module.exports = router