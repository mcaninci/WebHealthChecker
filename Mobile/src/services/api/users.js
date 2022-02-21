import config from './../config';
import request from './request';

const userLogin =  (data,callback) => {
    const res =  request('login/signin', 'POST', data,callback);
    return  res;
}

const userRegister =  (data,callback) => {
    const res =  request('login/signup', 'POST', data,callback);
    return  res;
}

const userLogout =  (callback) => {
    const res =  request('login/logout', 'POST',callback);
    return  res;
}

const saveUrl =  (data,callback) => {
    const res =  request('url/save', 'POST',data,callback);
    return  res;
}

const updateUrl =  (data,callback) => {
    const res =  request('url/update', 'POST',data,callback);
    return  res;
}


const getUrls =  (callback) => {
    const res =  request('url/geturls', 'POST',null,callback);
    return  res;
}

const getMonitoringList =  (callback) => {
    const res =  request('monitoring/getmonitoringlist', 'POST',null,callback);
    return  res;
}








export {

    userLogin,
    userRegister,
    userLogout,
    saveUrl,
    updateUrl,
    getUrls,
    getMonitoringList
  
}
