import axios from 'axios';
import {REACT_APP_API_URL, REACT_APP_FACE_API_URL} from '@env';

const CheckUserAPI = async (email, id) => {
  const url = REACT_APP_API_URL + '/api/checkuser';

  return axios.post(url, {email: email, id: id});
};

const CheckAccountAPI = async EmpID => {
  const url = REACT_APP_API_URL + '/api/checkaccount';

  return axios.post(url, {EmpID: EmpID});
};

const NewsAPI = async () => {
  const url = REACT_APP_API_URL + '/api/news';

  return axios.get(url);
};

const NewsPinAPI = async () => {
  const url = REACT_APP_API_URL + '/api/newspin';

  return axios.get(url);
};

const RegisAuthAPI = async formData => {
  const url = REACT_APP_API_URL + '/api/upload';

  return axios.post(url, formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

const AuthAPI = async formData => {
  const url = REACT_APP_FACE_API_URL + '/verify';

  // console.log(formData);
  return axios.post(url, formData);
};

const Check_InorOut = async (empID, date) => {
  const url = REACT_APP_API_URL + '/api/check_InOrOut';

  return axios.post(url, {
    EmpID: empID,
    Date: date
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

const CheckIn = async (empID, date, time, location, model) => {
  const url = REACT_APP_API_URL + '/api/checkin';

  return axios.post(url, {
    EmpID: empID,
    Date: date,
    Time: time,
    Location: location,
    Model: model,
  });
};

const CheckOut = async (empID, date, time, location, model) => {
  const url = REACT_APP_API_URL + '/api/checkout';

  return axios.post(url, {
    EmpID: empID,
    Date: date,
    Time: time,
    Location: location,
    Model: model,
  });
};

const ContactsAPI = async () => {
  const url = REACT_APP_API_URL + '/api/contacts';

  return axios.get(url);
};

const ReportsAPI = async EmpID => {
  const url = REACT_APP_API_URL + '/api/reports';

  return axios.post(url, {EmpID: EmpID});
};

const Service = {
  CheckUserAPI,
  CheckAccountAPI,
  RegisAuthAPI,
  AuthAPI,
  Check_InorOut,
  CheckIn,
  CheckOut,
  NewsAPI,
  NewsPinAPI,
  ContactsAPI,
  ReportsAPI,
};

export default Service;
