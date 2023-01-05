const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { addCourse, modifyCourse, queryCourse, deleteCourse } = require('../controller/course.controller')


const router = new Router({ prefix: '/course' })

router.post('/addCourse', auth, addCourse)
router.post('/modifyCourse', auth, modifyCourse)
router.post('/queryCourse', auth, queryCourse)
router.post('/deleteCourse', auth, deleteCourse)

module.exports = router