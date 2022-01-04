import { LOGIN_SUCCESS,LOGOUT_SUCCESS, DONATE_SUCCESS } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = ({ hescode,asikarti,hescodeSS}) => async (dispatch) => {
  if (hescode!="" ||hescodeSS!=null ) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user:{
        name: 'user_' + ID(),
        uid: 'id' + ID(),
        hescode,
        asikarti,hescodeSS

      }}
    });

    dispatch(setUser(hescode,asikarti,hescodeSS));
  }


};


export const donate = () => async (dispatch) => {

  dispatch({
    type: DONATE_SUCCESS, payload: { }
  });
  };

export const logout = () => async (dispatch) => {

  AsyncStorage.clear();
  dispatch({
    type: LOGOUT_SUCCESS,
    payload: { user:{
      name: undefined,
      uid: undefined,
      hescode:undefined

    }}
  });
  };

export const setUser = (hescode, asikarti,hescodeSS) => async (dispatch) => {

await AsyncStorage.setItem('@hescode',hescode);
await AsyncStorage.setItem('@asikarti',asikarti.toString()??"".toString());
await AsyncStorage.setItem('@hescodeSS',hescodeSS.toString()??"".toString());
};

// Load a user from async storage 
export const loadUser = () => async (dispatch) => { 

 const hescode= await AsyncStorage.getItem('@hescode');
 const asikartistr=  await AsyncStorage.getItem('@asikarti');
 const asikarti=  JSON.stringify(asikartistr);
 const hescodeSSstr=  await AsyncStorage.getItem('@hescodeSS');
 const hescodeSS=  JSON.stringify(hescodeSSstr);
 if(hescode || hescodeSS ){
dispatch(login({ hescode, asikarti,hescodeSS }) );
 }

};

export function ID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
