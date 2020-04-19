/*
Encapsulate axios ajax to common function
params: url,data,method
return: Promise
 */

import axios from 'axios';

export default function ajax(url,data={},method='GET') {
    if(method === 'GET') {
        let paramStr =  ''
        Object.keys(data).forEach(key => {
            paramStr += key + '=' + data[key] + '&'
        })
        if(paramStr){
            paramStr.substring(0,paramStr.length-1)
        }
        return axios.get(url + '?' + paramStr)
    } else {
        return axios.post(url,data)
    }
}