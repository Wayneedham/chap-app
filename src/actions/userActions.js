
import { AsyncStorage , Platform, Alert} from "react-native"
import serverurl from '../../config/const/serverurl'; 
import {
  fetchDataPending, 
  fetchDataSuccess, 
  fetchDataError,
  fetchListPending,
  fetchListSuccess,
  fetchListError
} from './actions';

var { FBLoginManager } = require("react-native-facebook-login");
  
export function verficationEmail(mail) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
}

export function verficationPassword(passwd) {
    return passwd.length > 7 && passwd.length < 31;
}

export function handleFacebookLogin () {
  return dispatch => {
    dispatch(fetchDataPending());
    if (Platform.OS === "android")
      FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.WebView);
      FBLoginManager.loginWithPermissions(["email", "public_profile"], async(error, data) => {
        if (!error) {
          const token = data.credentials.token;
          const response = await fetch(
            `https://graph.facebook.com/v2.5/me?fields=email,name,gender,birthday,work,about,education&access_token=` +
              token
          );
          var fbUser = await response.json();
          var names  = fbUser.name.split(" ");

          const userData = new FormData()
          userData.append('email', fbUser.email);
          userData.append('last_name', names[0]);
          userData.append('first_name', names[1]);
          userData.append('is_social', true);

          const url = serverurl.basic_url + 'sociallogin';
          fetch(url , {
            method: "post",
            body: userData
          })
          .then(res => res.json())
          .then(res => {
            dispatch(fetchDataSuccess(res));
            return res;
          })
          .catch(error => {
            dispatch(fetchDataError(error));
          })
        }else{
          dispatch(fetchDataError(error));
        }
      }
    );
  }
}

export async function fbLogin(token, props) {
  const response = await fetch(
    `https://graph.facebook.com/v2.5/me?fields=email,name,gender,birthday,work,about,education&access_token=` +
      token
  );
  var fbUser = await response.json();
  var names  = fbUser.name.split(" ");
  const userData = new FormData()
  userData.append('email', fbUser.email);
  userData.append('last_name', names[0]);
  userData.append('first_name', names[1]);
  userData.append('is_social', true);

  const url = serverurl.basic_url + 'sociallogin';
  postRequest(userData, url);
}

export async function fblogOut() {
  FBLoginManager.logout(function(error, data) {
    console.log("error==", error);
  });
}

export function userSignup(userData){
  const url = serverurl.basic_url + 'register';
  return dispatch => {
    dispatch(fetchDataPending());
    fetch(url , {
      method: "post",
      body: userData
    })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchDataSuccess(res));
      return res;
    })
    .catch(error => {
      dispatch(fetchDataError(error));
    })
  }
}

export function userLogin(userData){  
  const url = serverurl.basic_url + 'login';
  return dispatch => {
    dispatch(fetchDataPending());
    fetch(url , {
      method: "post",
      body: userData
    })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchDataSuccess(res));
      return res;
    })
    .catch(error => {
      Alert.alert('', error.message)
      dispatch(fetchDataError(error));
    })
  }
}

export function postNewHorse(postData){ 
  const url = serverurl.basic_url + 'detection';
  return dispatch => {
    dispatch(fetchDataPending());
    fetch(url , {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: postData
    })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchDataSuccess(res));
      const allList = res["all"];
      dispatch(fetchListSuccess(allList));
      return res;
    })
    .catch(error => {
      dispatch(fetchDataError(error));
    })
  }
}

export function fetchHorseList(userID){ 
  const url = serverurl.basic_url + 'detections/'+userID;
  return dispatch => {
    dispatch(fetchListPending());
    fetch(url)
    .then(res => res.json())
    .then(res => {
      dispatch(fetchListSuccess(res));
      return res;
    })
    .catch(error => {
      dispatch(fetchListError(error));
    })
  }
}

export function videoPurchase(postData){ 
  const url = serverurl.basic_url + 'charge';
  return dispatch => {
    dispatch(fetchDataPending());
    fetch(url , {
      method: "post",
      body: postData
    })
    .then(res => res.json())
    .then(res => {
      dispatch(fetchDataSuccess(res));
      return res;
    })
    .catch(error => {
      dispatch(fetchDataError(error));
    })
  }
}

export function postRequest(postData, url){ 
  return dispatch => {
    dispatch(fetchDataPending());
    return fetch(url , {
      method: "post",
      body: postData
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      dispatch(fetchDataSuccess(res));
      return res;
    })
    .catch(error => {
      dispatch(fetchDataError(error));
    })
  }
}

export async function _storeData(key,value){
  try {
    if(key=='lang')await AsyncStorage.setItem(key, value);
    else await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Error saving data
  }
}

export async function _retrieveData(key){
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      return value;
    }
    } catch (error) {
      // Error retrieving data
      return null;
    }
}

export async function  clearData(){
  try {
      AsyncStorage.removeItem('logged');
      AsyncStorage.removeItem('userInfo');
    } catch (error) {
      // Error retrieving data
      return null;
    }
}

export function calcuateHorseAge(value, imgType){
  const age = value.toFixed(2);
  let ageStr = '';
  if(age > 0 && age < 5){
    ageStr = "Less than 5 Years Old";
  }
  if(age >= 5 && age < 6){
    ageStr = "5 - 7 Years Old";
  }
  if(age >= 6 && age < 7){
    ageStr = "6 - 8 Years Old";
  }
  if(age >= 7 && age < 8){
    ageStr = "7 - 9 Years Old";
  }
  if(age >= 8 && age < 9){
    ageStr = "8 - 10 Years Old";
  }
  if(age >= 9 && age < 10){
    ageStr = "9 - 11 Years Old";
  }
  if(age >= 10 && age < 11){
    ageStr = "10 - 12 Years Old";
  }
  if(age >= 11 && age < 12){
    ageStr = "11 - 13 Years Old";
  }
  if(age >= 12 && age < 13){
    ageStr = "12 - 14 Years Old";
  }
  if(age >= 13 && age < 14){
    ageStr = "13 - 15 Years Old";
  }
  if(age >= 14 && age < 15){
    ageStr = "14 - 16 Years Old";
  }
  switch (imgType) {
    case "upper":
      if(age >= 20){
        ageStr = "20 or Older";
      }else{
        if(age >= 15 && age < 16){
          ageStr = "15 - 17 Years Old";
        }
        if(age >= 16 && age < 17){
          ageStr = "16 - 18 Years Old";
        }
        if(age >= 17 && age < 20){
          ageStr = "18 - 20 Years Old";
        }
      }
      break;
    default:
    case "lower":
      if(age >= 17){
        ageStr = "17 or Older";
      }else{
        if(age >= 15 && age < 17){
          ageStr = "15 - 17 Years Old";
        }
      }
      break;
  }
  // const age = Math.round(value);
  // if(age >= 17){
  //   ageStr = "17 or Older";
  // }else{
  //   if((age-1)>0){
  //     ageStr = (age - 1) + " - " + (age + 1) + " Years Old"
  //   }else{
  //     ageStr = "0 - " + (age + 1) + " Years Old"
  //   }
  // }
  return ageStr;
}

export function shuffle(arra1) {
  var ctr = arra1.length, temp, index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}