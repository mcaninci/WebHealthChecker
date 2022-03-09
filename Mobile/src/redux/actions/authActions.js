import { LOGIN_SUCCESS, LOGOUT_SUCCESS, LOAD_USER,UPDATE_URL } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = ({  token,hashcode }) => async (dispatch) => {

  dispatch({
    type: LOGIN_SUCCESS,
    payload: {
      user: {
        token: token,
        hashcode:hashcode
      }
    }
  });

  dispatch(setUser(token, hashcode));


};
export const updateUrlFlag = (updateurl) => async (dispatch) => {

  dispatch({
    type: UPDATE_URL,
    payload: {updateurl:updateurl }
  });


};


export const setUserDetail = (userobject) => async (dispatch) => {

  dispatch({
    type: LOAD_USER,
    payload: {userDetail:userobject }
  });


};

export const GetToken =  async () => {
  const token = await AsyncStorage.getItem('@token');
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

export const setUser = (token, hashcode,) => async (dispatch) => {

  await AsyncStorage.setItem('@token', token).toString() ?? "".toString();
  await AsyncStorage.setItem('@hashcode', hashcode.toString() ?? "".toString());

};

// Load a user from async storage 
export const loadUser = () => async (dispatch) => {

  const token = await AsyncStorage.getItem('@token');
  const hashcode = await AsyncStorage.getItem('@hashcode');


  if (token || hashcode ) {
    dispatch(login({ token, hashcode }));
  }

};

export function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
