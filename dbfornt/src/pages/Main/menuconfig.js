const admin_menuConfig = [
  {
    key: '/student',
    icon: null,
    children: '',
    label: '学生管理',
    type: '',
  },
  {
    key: '/teacher',
    icon: null,
    children: '',
    label: '教师管理',
    type: '',
  },
  {
    key: '/course',
    icon: null,
    children: '',
    label: '课程管理',
    type: '',
  },
  {
    key: '/enrollment',
    icon: null,
    children: '',
    label: '选课管理',
    type: '',
  },
  {
    key: '/department',
    icon: null,
    children: '',
    label: '院系管理',
    type: '',
  },
  {
    key: '/grade',
    icon: null,
    children: '',
    label: '成绩管理',
    type: '',
  },
]

const student_menuConfig = [
  {
    key: '/student/enrollment',
    icon: null,
    children: '',
    label: '学生选课',
    type: '',
  },
  {
    key: '/grade',
    icon: null,
    children: '',
    label: '学生信息',
    type: '',
  },
]
const teacher_menuConfig = [

]



export default (function () {
  let user = JSON.parse(localStorage.getItem('user'))
  switch (user.identity) {
    case 'admin':
      return admin_menuConfig
    case 'student':
      return student_menuConfig
    case 'teacher':
      return teacher_menuConfig
    default:
      return admin_menuConfig
  }
})()