import config from './../config';
import request from './request';

const userLogin =  (data,callback) => {
    const res =  request('login/signin', 'POST', data,callback);
    return  res;
}
const userGet =  (data,callback) => {
    const res =  request('login/getuserbyhashcode', 'POST', data,callback);
    return  res;
}
const userProfit =  (data,callback) => {
    const res =  request('login/billingHashCode', 'POST', data,callback);
    return  res;
}
const isLoggedIn =  () => {
    const res =  request('isLoggedIn', 'GET');
    return  res;
}

const userLogout =  (callback) => {
    const res =  request('user/logout', 'POST',callback);
    return  res;
}

const userRegister =  (data,callback) => {
    const res =  request('login/signup/', 'POST', data,callback);
    return  res;
}

// const getUsers = async () => {
//     const res =  request('users', 'GET');
//     return  res.json();
// }




export {
    userGet,
    userLogin,
    userRegister,
    userLogout,
    userProfit,
    // getUsers,
    isLoggedIn
}
