import axios from 'axios'
import qs from 'qs'
import config from './config-client'

// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials=true;

axios.interceptors.request.use(
    config => {
        // const token = getCookie('token');
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -404,
            message: response.statusText,
            data: ''
        }
    }
}

function checkCode(res) {
  let data
  if (!res) {
    return
  }
  if (res.status === 200 && res.data) {
    data = res.data
    let errno = data.errno
    if (data && errno == 70003 || errno == 70072 || errno == 50001) {
    //   window.location.href = '/404'
      return
    }
  }
    return res
}

export default {
    post(url, data, fileBool = false) {
        console.log("isClient")
        let headerFn= fileBool ? {
            'Content-Type': 'multipart/form-data'
        } : {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        return axios({
            method: 'post',
            url: config.api + url,
            data: fileBool ? data : qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                ...headerFn
            }
        }) .catch( (err) => {
          console.log('index-client', err)
        })
            .then(checkStatus)
            .then(checkCode)
    },
    get(url, params, responseType = 'json') {
        return axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            responseType: responseType,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },

        })
            .then(checkStatus)
            .then(checkCode)
    }
}
