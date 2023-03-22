import axios from 'axios';
import {REACT_APP_API_URL} from '@env';

const CheckUserAPI = async (email, id) => {
  const url = REACT_APP_API_URL + '/api/checkuser';

  return axios.post(url, {email: email, id: id} );
};

const CheckAccountAPI = async (EmpID) => {
  const url = REACT_APP_API_URL + '/api/checkaccount';

  return axios.post(url, { EmpID: EmpID} );
};

const NewsAPI = async () => {
  const url = REACT_APP_API_URL + '/api/news';

  return axios.get(url)
}

const RegisAuthAPI = async (formData) => {
  const url = REACT_APP_API_URL + '/api/upload';

  return axios.post(url, formData);
}

const Service = {
  CheckUserAPI,
  CheckAccountAPI,
  NewsAPI,
  RegisAuthAPI,
};

export default Service;
