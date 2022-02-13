import { RequestError } from './RequestError';

import config from '../config';
import { GetToken } from '../../redux/actions/authActions';

import base64 from 'base-64';
import axios from 'axios';

const request = async function (endpoint, method, data, callback) {
  const token=await GetToken();

  const response = await fetch(`${config.API_URL}/${endpoint}`, {
    method,
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
        'Authorization': 'Basic ' + base64.encode(token),
    },
    body: JSON.stringify(data)
}).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ' + error.message);
  // ADD THIS THROW error
 
}).then((response) => {
  // In this case, we check the content-type of the response
  if (response.headers.get('content-type').match(/application\/json/)) {
     response.json().then(function (data) {
      if (response.ok) {
      callback({
              value: data,
              isSuccess: true
            });
          }
          else {    
            callback({ statusText: "Operation failed.", isSuccess: false, status: 500, content: "Operation failed." });
          
          }
        
    });
  }
  else{
    callback({ statusText: "Operation failed.", isSuccess: false, status: 500, content: "Operation failed." });
  }
}
     );



debugger;









  


}


export default request;