import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOAD_USER } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = ({ email, password, token }) => async (dispatch) => {

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      user: {
        token: token,
        email: email,
        pass: password  
      }
    }
  });

  dispatch(setUser(token, email, password));


};


export const setUserDetail = (userobject) => async (dispatch) => {

  dispatch({
    type: LOAD_USER,
    payload: {userDetail:userobject }
  });





};

export const GetToken =  async () => {
  const token = await AsyncStorage.getItem('token');
  return  token||"null";
}; 

export const donate = () => async (dispatch) => {

  dispatch({
    type: DONATE_SUCCESS, payload: {}
  });
};

export const logout = () => async (dispatch) => {

  AsyncStorage.clear();
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: {
      user: null
    }
  });
};

export const setUser = (token, email, password) => async (dispatch) => {

  await AsyncStorage.setItem('@token', token).toString() ?? "".toString();
  await AsyncStorage.setItem('@email', email.toString() ?? "".toString());
  await AsyncStorage.setItem('@password', password.toString() ?? "".toString());
};

// Load a user from async storage 
export const loadUser = () => async (dispatch) => {

  const token = await AsyncStorage.getItem('@token');
  const email = await AsyncStorage.getItem('@email');
  const password = await AsyncStorage.getItem('@password');

  if (token || email || password) {
    dispatch(login({ email, password, token }));
  }

};

export function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
