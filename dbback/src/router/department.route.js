const Router = require('koa-router')
const { auth } = require('../middleware/auth.middleware')
const { addDepartment, modifyDepartment, queryDepartment, deleteDepartment } = require('../controller/department.controller')


const router = new Router({ prefix: '/department' })

router.post('/addDepartment', auth, addDepartment)
router.post('/modifyDepartment', auth, modifyDepartment)
router.post('/queryDepartment', auth, queryDepartment)
router.post('/deleteDepartment', auth, deleteDepartment)

module.exports = router