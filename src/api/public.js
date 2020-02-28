import axios from 'axios'
import { getStore } from '/utils/storage'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use(config => {
  //  console.log(config)
  if (getStore('token')) {
    // console.log(window.sessionStorage.getItem('token'))
    config.headers.Authorization = getStore('token')
  }
  // 在最后必须 return config
  return config
})
export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {params}).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPut (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchDelete (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
