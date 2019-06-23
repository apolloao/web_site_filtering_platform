import { stringify } from 'qs';
import axios from 'axios'
import { message} from 'antd';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';

// 封装请求
export function fetch (url, options) {
    var opt = options || {};
    return new Promise((resolve, reject) => {
        axios({
            method: opt.type || 'post',
            url: url,
            params: opt.params || {},
            data: (opt.headers && opt.headers['Content-Type'].indexOf('x-www-form-urlencoded') > 0 ? stringify(opt.data) : opt.data ) || {},
            responseType: opt.dataType || 'json',
            headers: opt.headers || {'Content-Type': 'application/json; charset=UTF-8'},
            timeout: opt.timeout || 30000
        }).then(response => {
            if (response.data.code === 1) {
                resolve(response.data)
            }else {
              message.error(response.data.data);

            }
        }).catch(error => {
          reject(error)
        })
    })
}

export default axios;
