import axios from 'axios';
import {REACT_APP_API_URL} from '@env';

const RegisterAPI = async (email, id) => {
  const url = REACT_APP_API_URL + '/api/regis';
  console.log(url);

  return axios.post(url, {email: email, id: id} );
};

const Service = {
  RegisterAPI,
};

export default Service;
