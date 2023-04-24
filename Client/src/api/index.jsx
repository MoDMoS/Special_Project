import axios from 'axios';
import { REACT_APP_API_URL, REACT_APP_FACE_API_URL } from '@env';

const LoginAPI = async (empid) => {
  const url = REACT_APP_API_URL + '/api/user/login';

  return axios.post(url, { EmpID: empid }, { headers: { 'content-Type': 'application/json' } });
};

const RefCodeAPI = async (empid, email) => {
  const url = REACT_APP_API_URL + '/api/user/sendRefCode';

  return axios.post(url, { EmpID: empid, Email: email }, { headers: { 'content-Type': 'application/json' } });
};

const CheckRefAPI = async (email, id, ref) => {
  const url = REACT_APP_API_URL + '/api/user/checkref';

  return axios.post(url, { Email: email, EmpID: id, Ref: ref }, { headers: { 'content-Type': 'application/json' } });
};

const CheckUserAPI = async (email, id) => {
  const url = REACT_APP_API_URL + '/api/user/checkuser';

  return axios.post(url, { Email: email, EmpID: id }, { headers: { 'content-Type': 'application/json' } });
};

const CheckAccountAPI = async EmpID => {
  const url = REACT_APP_API_URL + '/api/user/checkaccount';

  return axios.post(url, { EmpID: EmpID }, { headers: { 'content-Type': 'application/json' } });
};

const NewsAPI = async () => {
  const url = REACT_APP_API_URL + '/api/news/news';

  return axios.get(url, { headers: { 'content-Type': 'application/json' } });
};

const NewsPinAPI = async () => {
  const url = REACT_APP_API_URL + '/api/news/newspin';

  return axios.get(url, { headers: { 'content-Type': 'application/json' } });
};

const RegisAuthAPI = async formData => {
  const url = REACT_APP_API_URL + '/api/user/upload';

  return axios.post(url, formData, { headers: { Accept: 'application/json', 'content-Type': 'multipart/form-data' } });
};

const AuthAPI = async formData => {
  const url = REACT_APP_FACE_API_URL + '/verify';

  // console.log(formData);
  return axios.post(url, formData, { headers: { 'content-Type': 'application/json' } });
};

const Check_InorOut = async (empID, date) => {
  const url = REACT_APP_API_URL + '/api/worktime/check_InOrOut';

  return axios.post(url, { EmpID: empID, Date: date }, { headers: { 'content-Type': 'application/json' } });
}

const CheckIn = async (empID, date, time, location, model) => {
  const url = REACT_APP_API_URL + '/api/worktime/checkin';

  return axios.post(url, { EmpID: empID, Date: date, Time: time, Location: location, Model: model }, { headers: { 'content-Type': 'application/json' } });
};

const CheckOut = async (empID, date, time, location, model) => {
  const url = REACT_APP_API_URL + '/api/worktime/checkout';

  return axios.post(url, { EmpID: empID, Date: date, Time: time, Location: location, Model: model }, { headers: { 'content-Type': 'application/json' } });
};

const ContactsAPI = async () => {
  const url = REACT_APP_API_URL + '/api/user/contacts';

  return axios.get(url, { headers: { 'content-Type': 'application/json' } });
};

const MeetingAPI = async ( date, start, end ) => {
  const url = REACT_APP_API_URL + '/api/booking/meeting';

  return axios.post(url, { Date: date, Start: start, End: end }, { headers: { 'content-Type': 'application/json' } });
};

const BookingAPI = async ( roomid, topic, empid, date, start, end ) => {
  const url = REACT_APP_API_URL + '/api/booking/booking';

  return axios.post(url, { RoomID: roomid, Topic: topic, EmpID: empid, Date: date, Start: start, End: end }, { headers: { 'content-Type': 'application/json' } });
};

const DelBookingAPI = async ( bookingid, date, start, end ) => {
  const url = REACT_APP_API_URL + '/api/booking/delbooking';
  console.log(JSON.stringify({ BookingID: bookingid, Date: date, Start: start, End: end }))

  return axios.post(url, JSON.stringify({ BookingID: bookingid, Date: date, Start: start, End: end }), { headers: { 'content-Type': 'application/json' } });
};

const ReportsAPI = async EmpID => {
  const url = REACT_APP_API_URL + '/api/worktime/reports';

  return axios.post(url, { EmpID: EmpID }, { headers: { 'content-Type': 'application/json' } });
};

const ApporveAPI = async ( empid ) => {
  const url = REACT_APP_API_URL + '/api/booking/checkbooking';

  return axios.post(url, { EmpID: empid }, { headers: { 'content-Type': 'application/json' } });
};

const Service = {
  LoginAPI,
  RefCodeAPI,
  CheckRefAPI,
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
  MeetingAPI,
  BookingAPI,
  DelBookingAPI,
  ReportsAPI,
  ApporveAPI,
};

export default Service;
