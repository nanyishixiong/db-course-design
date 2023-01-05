import axios from 'axios'


export function debounce(func, wait = 500) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait);
  }
}

export const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' }
})

instance.interceptors.request.use(function (config) {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = 'Bearer ' + user.token
  }

  return config;
});