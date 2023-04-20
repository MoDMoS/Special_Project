import axios from 'axios';
import { REACT_APP_API_URL, REACT_APP_FACE_API_URL } from '@env';

const LoginAPI = async (empid) => {
  const url = REACT_APP_API_URL + '/api/login';

  return axios.post(url, { EmpID: empid });
};

const CheckUserAPI = async (email, id) => {
  const url = REACT_APP_API_URL + '/api/checkuser';

  return axios.post(url, { email: email, id: id });
};

const CheckAccountAPI = async EmpID => {
  const url = REACT_APP_API_URL + '/api/checkaccount';

  return axios.post(url, { EmpID: EmpID });
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

  return axios.post(url, formData, { headers: { Accept: 'application/json', 'Content-Type': 'multipart/form-data' } });
};

const AuthAPI = async formData => {
  const url = REACT_APP_FACE_API_URL + '/verify';

  // console.log(formData);
  return axios.post(url, formData);
};

const Check_InorOut = async (empID, date) => {
  const url = REACT_APP_API_URL + '/api/check_InOrOut';

  return axios.post(url, { EmpID: empID, Date: date }, { headers: { 'Content-Type': 'application/json' } });
}

const CheckIn = async (empID, date, time, location, model) => {
  const url = REACT_APP_API_URL + '/api/checkin';

  return axios.post(url, { EmpID: empID, Date: date, Time: time, Location: location, Model: model }, { headers: { 'Content-Type': 'application/json' } });
};

const CheckOut = async (empID, date, time, location, model) => {
  const url = REACT_APP_API_URL + '/api/checkout';

  return axios.post(url, { EmpID: empID, Date: date, Time: time, Location: location, Model: model }, { headers: { 'Content-Type': 'application/json' } });
};

const ContactsAPI = async () => {
  const url = REACT_APP_API_URL + '/api/contacts';

  return axios.get(url);
};

const MeetingAPI = async ( date, start, end ) => {
  const url = REACT_APP_API_URL + '/api/meeting';

  return axios.post(url, { Date: date, Start: start, End: end });
};

const BookingAPI = async ( roomid, topic, empid, date, start, end ) => {
  const url = REACT_APP_API_URL + '/api/booking';

  return axios.post(url, { RoomID: roomid, Topic: topic, EmpID: empid, Date: date, Start: start, End: end });
};

const DelBookingAPI = async ( bookingid, date, start, end ) => {
  const url = REACT_APP_API_URL + '/api/delbooking';
  console.log(JSON.stringify({ BookingID: bookingid, Date: date, Start: start, End: end }))

  return axios.post(url, JSON.stringify({ BookingID: bookingid, Date: date, Start: start, End: end }), { headers: { 'Content-Type': 'application/json' } });
};

const ReportsAPI = async EmpID => {
  const url = REACT_APP_API_URL + '/api/reports';

  return axios.post(url, { EmpID: EmpID });
};

const ApporveAPI = async ( empid ) => {
  const url = REACT_APP_API_URL + '/api/checkbooking';

  return axios.post(url, { EmpID: empid });
};

const Service = {
  LoginAPI,
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
