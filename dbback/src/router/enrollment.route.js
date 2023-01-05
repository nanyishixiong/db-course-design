const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { addEnrollment, modifyEnrollment, queryEnrollment, deleteEnrollment } = require('../controller/Enrollment.controller')


const router = new Router({ prefix: '/enrollment' })

router.post('/addEnrollment', auth, addEnrollment)
router.post('/modifyEnrollment', auth, modifyEnrollment)
router.post('/queryEnrollment', auth, queryEnrollment)
router.post('/deleteEnrollment', auth, deleteEnrollment)

module.exports = router